import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { execFile } from "child_process";
import util from "util";
import fs from "fs/promises";
import os from "os";
import path from "path";
import crypto from "crypto";

const execFilePromise = util.promisify(execFile);

const generateSchema = z.object({
  githubUrl: z
    .string()
    .url("Must be a valid URL")
    .refine((url) => url.startsWith("https://github.com/"), {
      message: "Must be a valid GitHub URL (https://github.com/...)",
    }),
});

async function countFilesByExtension(
  dirPath: string,
  maxDepth: number,
  currentDepth = 0
): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  if (currentDepth > maxDepth) return counts;

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "dist" || entry.name === "build") {
        continue;
      }

      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        const subCounts = await countFilesByExtension(
          fullPath,
          maxDepth,
          currentDepth + 1
        );
        for (const [ext, count] of Object.entries(subCounts)) {
          counts[ext] = (counts[ext] || 0) + count;
        }
      } else {
        const ext = path.extname(entry.name);
        if (ext) {
          counts[ext] = (counts[ext] || 0) + 1;
        }
      }
    }
  } catch (error: unknown) {
    const err = error as NodeJS.ErrnoException;
    if (err.code !== 'ENOENT' && err.code !== 'EACCES') {
        console.warn(`Warning: Could not read directory or file '${dirPath}' (Depth: ${currentDepth}):`, err);
    }
  }
  return counts;
}

async function readOptionalFile(filePath: string, encoding: BufferEncoding = 'utf8', truncateLength?: number): Promise<string | null> {
    try {
        const content = await fs.readFile(filePath, encoding);
        return truncateLength ? content.substring(0, truncateLength) : content;
    } catch (error: unknown) {
        const err = error as NodeJS.ErrnoException;
        if (err.code === 'ENOENT') {
            return null;
        }
        console.error(`Error reading file ${filePath}:`, err);
        throw err;
    }
}

export async function POST(req: NextRequest) {
  let tempDir: string | undefined;

  try {
    const body = await req.json();
    const { githubUrl } = generateSchema.parse(body);

    tempDir = path.join(os.tmpdir(), `gitme-repo-${crypto.randomUUID()}`);

    try {
      await execFilePromise("git", ["clone", "--depth", "1", githubUrl, tempDir]);

      let packageJsonContent = null;
      const packageJsonRaw = await readOptionalFile(path.join(tempDir, "package.json"));
      if (packageJsonRaw) {
        try {
          const parsed = JSON.parse(packageJsonRaw);
          packageJsonContent = {
            name: parsed.name,
            description: parsed.description,
            dependencies: parsed.dependencies ? Object.keys(parsed.dependencies) : [],
            devDependencies: parsed.devDependencies ? Object.keys(parsed.devDependencies) : [],
          };
        } catch (e) {
          console.error("Failed to parse package.json:", e);
        }
      }

      let readmeContent: string | null = null;
      const readmeVariants = [
        "README.md", "readme.md", "README", "README.txt", "Readme.md",
      ];
      for (const variant of readmeVariants) {
        readmeContent = await readOptionalFile(path.join(tempDir, variant), 'utf8', 1500);
        if (readmeContent) break;
      }

      let licenseContent: string | null = null;
      const licenseVariants = ["LICENSE", "LICENSE.md", "LICENSE.txt", "license"];
      for (const variant of licenseVariants) {
        licenseContent = await readOptionalFile(path.join(tempDir, variant), 'utf8', 100);
        if (licenseContent) break;
      }

      const languageFilesCount = await countFilesByExtension(tempDir, 4);

      let repoName = githubUrl.split("/").filter(Boolean).pop();
      if (repoName?.endsWith(".git")) repoName = repoName.replace(".git", "");

      const metadata = {
        repoName: repoName || "Unknown Repository",
        initialDescription: readmeContent,
        detectedLanguages: languageFilesCount,
        licensePreview: licenseContent,
        packageData: packageJsonContent,
      };

      return NextResponse.json({ success: true, metadata }, { status: 200 });
    } catch (error: unknown) {
      console.error("Repository Clone/Analyze Error:", error);
      let errorMessage = "Failed to clone or analyze repository. Ensure it's public and valid.";
      if (error instanceof Error) {
        if (error.message.includes("not found")) {
          errorMessage = "Repository not found or URL is incorrect. Please check the GitHub URL.";
        } else if (error.message.includes("Authentication failed")) {
          errorMessage = "Failed to access repository. It might be private or require authentication.";
        }
      }
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    } finally {
      if (tempDir) {
        try {
          await fs.rm(tempDir, { recursive: true, force: true });
        } catch (e) {
          console.error(`Cleanup error on ${tempDir}:`, e);
        }
      }
    }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Error", details: error.issues }, { status: 400 });
    }
    console.error('Unhandled API Error:', error);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}