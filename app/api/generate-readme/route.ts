import { NextRequest, NextResponse } from "next/server";
    import { z } from "zod";
    import { execFile } from "child_process";
    import util from "util";
    import fs from "fs/promises";
    import os from "os";
    import path from "path";
    import crypto from "crypto";
    import pino from "pino";

    import { generateReadmeContentWithAI } from "../../../lib/ai-readme-generator";

    const logger = pino({ name: "gitme-api" });

    const execFilePromise = util.promisify(execFile);

    const generateSchema = z.object({
      githubUrl: z
        .string()
        .url("Must be a valid URL")
        .refine((url) => url.startsWith("https://github.com/"), {
          message: "Must be a valid GitHub URL (https://github.com/...)",
        }),
    });

    const ipLimitMap = new Map<string, { count: number; lastReset: number }>();
    const RATE_LIMIT_MAX = 5; 
    const RATE_LIMIT_WINDOW_MS = 60 * 1000; 


    async function readOptionalFile(filePath: string, encoding: BufferEncoding = 'utf8', truncateLength?: number): Promise<string | null> {
        try {
            const content = await fs.readFile(filePath, encoding);
            return truncateLength ? content.substring(0, truncateLength) : content;
        } catch (err: unknown) {
            const e = err as NodeJS.ErrnoException;
            if (e.code === 'ENOENT') {
                return null;
            }
            console.error(`Error reading file ${filePath}:`, e);
            throw e;
        }
    }

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
      } catch (e: unknown) {
        const error = e as NodeJS.ErrnoException;
        if (error.code !== 'ENOENT' && error.code !== 'EACCES') {
            console.warn(`Warning: Could not read directory or file '${dirPath}' (Depth: ${currentDepth}):`, error);
        }
      }
      return counts;
    }

    async function generateDirectoryTree(
      dirPath: string,
      maxDepth: number,
      currentDepth = 0,
      prefix = ""
    ): Promise<string> {
      if (currentDepth > maxDepth) return "";

      let treeString = "";
      try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });

        const filteredEntries = entries.filter(
          (entry) =>
            !entry.name.startsWith(".") &&
            entry.name !== "node_modules" &&
            entry.name !== "dist" &&
            entry.name !== "build" &&
            entry.name !== "out" &&
            entry.name !== ".next" &&
            entry.name !== "package-lock.json" &&
            entry.name !== "bun.lockb" &&
            entry.name !== "yarn.lock" &&
            entry.name !== "LICENSE"
        );

        for (let i = 0; i < filteredEntries.length; i++) {
          const entry = filteredEntries[i];
          const isLast = i === filteredEntries.length - 1;
          const entryPrefix = isLast ? "└── " : "├── ";
          const childPrefix = isLast ? "    " : "│   ";

          treeString += `${prefix}${entryPrefix}${entry.name}\n`;

          if (entry.isDirectory()) {
            const subTree = await generateDirectoryTree(
              path.join(dirPath, entry.name),
              maxDepth,
              currentDepth + 1,
              prefix + childPrefix
            );
            treeString += subTree;
          }
        }
      } catch (e: unknown) {
        const error = e as NodeJS.ErrnoException;
        if (error.code !== 'ENOENT' && error.code !== 'EACCES') {
            console.warn(`Warning: Could not generate tree for directory '${dirPath}' (Depth: ${currentDepth}):`, error);
        }
      }
      return treeString;
    }

    function detectFrameworks(dependencies: Record<string, string>, devDependencies: Record<string, string>) {
      const allDeps = { ...dependencies, ...devDependencies };
      const allDepNames = Object.keys(allDeps);
      const detected = {
        frontend: [] as string[],
        backend: [] as string[],
        orm: [] as string[],
        styling: [] as string[],
        stateManagement: [] as string[],
        testing: [] as string[],
        database: [] as string[],
        deployment: [] as string[],
        utility: [] as string[],
        versions: {} as Record<string, string>
      };

      const techMap: Record<string, keyof typeof detected> = {
        'next': 'frontend', 'react': 'frontend', 'vue': 'frontend', 'svelte': 'frontend', '@angular/core': 'frontend',
        '@remix-run/react': 'frontend', 'nuxt': 'frontend', 'gatsby': 'frontend',
        '@vercel/next': 'frontend',
        'express': 'backend', 'fastify': 'backend', '@nestjs/core': 'backend', 'koa': 'backend', 'hapi': 'backend',
        'restify': 'backend', 'flask': 'backend', 'django': 'backend', 'spring-boot': 'backend',
        'prisma': 'orm', 'mongoose': 'orm', 'typeorm': 'orm', 'drizzle-orm': 'orm',
        'sequelize': 'orm', 'kysely': 'orm',
        'pg': 'database', 'mysql2': 'database', 'sqlite3': 'database', 'mongodb': 'database', 'redis': 'database',
        'tailwindcss': 'styling', 'styled-components': 'styling', '@emotion/react': 'styling', 'bootstrap': 'styling',
        'sass': 'styling', 'less': 'styling', 'chakra-ui': 'styling', '@mui/material': 'styling',
        'zustand': 'stateManagement', 'redux': 'stateManagement', 'jotai': 'stateManagement', '@reduxjs/toolkit': 'stateManagement',
        'recoil': 'stateManagement', 'mobx': 'stateManagement',
        'jest': 'testing', 'vitest': 'testing', 'cypress': 'testing', 'playwright': 'testing',
        '@testing-library/react': 'testing', 'mocha': 'testing', 'chai': 'testing', 'supertest': 'testing',
        'docker': 'deployment', 'pm2': 'deployment', 'nginx': 'deployment', 'serverless': 'deployment',
        'zod': 'utility', 'lodash': 'utility', 'dayjs': 'utility', 'moment': 'utility',
        'ts-node': 'utility', 'nodemon': 'utility', 'chokidar': 'utility', 'axios': 'utility',
        '@google/generative-ai': 'utility', 'openai': 'utility',
        'puppeteer': 'utility',
      };

      for (const expectedDep of Object.keys(techMap)) {
        // Find if the dependency is installed (exact match to handle things like @nestjs/core)
        if (allDepNames.includes(expectedDep)) {
          const category = techMap[expectedDep];
          if (category !== 'versions' && !detected[category].includes(expectedDep)) {
             detected[category].push(expectedDep);
          }
          // Store version number
          detected.versions[expectedDep] = allDeps[expectedDep];
        }
      }

      if (detected.frontend.includes('next') && !detected.frontend.includes('react')) {
          detected.frontend.push('react');
          if (allDeps['react']) detected.versions['react'] = allDeps['react'];
      }

      return detected;
    }


    export async function POST(req: NextRequest) {
      let tempDir: string | undefined;
      const startTime = Date.now();
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown-ip";
      const now = Date.now();
      const userLimit = ipLimitMap.get(ip) || { count: 0, lastReset: now };

      if (now - userLimit.lastReset > RATE_LIMIT_WINDOW_MS) {
        userLimit.count = 1;
        userLimit.lastReset = now;
      } else {
        userLimit.count += 1;
      }
      ipLimitMap.set(ip, userLimit);

      if (userLimit.count > RATE_LIMIT_MAX) {
        logger.warn({ ip }, "Rate limit exceeded.");
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
      }

      try {
        const body = await req.json();
        const { githubUrl } = generateSchema.parse(body);

        logger.info({ ip, githubUrl }, "Started processing repository clone.");
        tempDir = path.join(os.tmpdir(), `gitme-repo-${crypto.randomUUID()}`);

        try {
          await execFilePromise("git", ["clone", "--depth", "1", githubUrl, tempDir], { timeout: 60 * 1000 });

          let packageJsonContent = null;
          const packageJsonRaw = await readOptionalFile(path.join(tempDir, "package.json"));
          if (packageJsonRaw) {
            try {
              const parsed = JSON.parse(packageJsonRaw);
              packageJsonContent = {
                name: parsed.name,
                description: parsed.description,
                dependencies: parsed.dependencies || {},
                devDependencies: parsed.devDependencies || {},
              };
            } catch (e: unknown) {
              logger.error({ err: e }, "Failed to parse package.json");
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

          const envVars: string[] = [];
          const envExampleContent = await readOptionalFile(path.join(tempDir, ".env.example"), 'utf8', 2000);
          if (envExampleContent) {
             const lines = envExampleContent.split(/\r?\n/);
             for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
                   const key = trimmed.split('=')[0].trim();
                   if (key) envVars.push(key);
                }
             }
          }

          const languageFilesCount = await countFilesByExtension(tempDir, 4);
          const detectedFrameworks = packageJsonContent
            ? detectFrameworks(packageJsonContent.dependencies, packageJsonContent.devDependencies)
            : null;
          const projectTree = await generateDirectoryTree(tempDir, 3); 

          let repoName = githubUrl.split("/").filter(Boolean).pop();
          if (repoName?.endsWith(".git")) repoName = repoName.replace(".git", "");

          const fullMetadata = {
            repoName: repoName || "Unknown Repository",
            initialDescription: readmeContent,
            detectedLanguages: languageFilesCount,
            licensePreview: licenseContent,
            packageData: packageJsonContent,
            detectedFrameworks: detectedFrameworks,
            directoryTree: projectTree,
            environmentVariables: envVars,
          };

          logger.info({ repoName, ip, loadTimeMs: Date.now() - startTime }, "Metadata gathered, invoking AI...");

          const generatedReadmeMarkdown = await generateReadmeContentWithAI(fullMetadata);


          logger.info({ repoName, durationMs: Date.now() - startTime }, "Successfully generated README.");
          return NextResponse.json({ success: true, readmeMarkdown: generatedReadmeMarkdown }, { status: 200 });
        } catch (err: unknown) {
          const e = err as Error;
          logger.error({ err: e, githubUrl }, "Repository Clone/Analyze/AI Error");
          let errorMessage = "Failed to process repository or generate README. Ensure it's public and valid.";
          if (e.message && e.message.includes("not found")) {
            errorMessage = "Repository not found or URL is incorrect. Please check the GitHub URL.";
          } else if (e.message && e.message.includes("Authentication failed")) {
            errorMessage = "Failed to access repository. It might be private or require authentication (public repos only for now).";
          } else if (e.message && e.message.includes("GEMINI_API_KEY")) {
            errorMessage = "AI service not configured. Please set GEMINI_API_KEY in your environment variables.";
          } else if (e.message && e.message.includes("AI API Error")) {
            // Rethrow specific AI failures nicely
            errorMessage = e.message;
          }
          return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
          );
        } finally {
          if (tempDir) {
            try {
              await fs.rm(tempDir, { recursive: true, force: true });
            } catch (e: unknown) {
              console.error(`Cleanup error on ${tempDir}:`, e);
            }
          }
        }
      } catch (error: unknown) {
        if (error instanceof z.ZodError) {
          return NextResponse.json({ error: "Validation Error", details: error.issues }, { status: 400 });
        }
        logger.error({ err: error }, 'Unhandled API Error');
        return NextResponse.json(
          { error: "An unexpected server error occurred." },
          { status: 500 }
        );
      }
    }