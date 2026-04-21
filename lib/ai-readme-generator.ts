import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";


    interface RepoMetadata {
      repoName: string;
      initialDescription: string | null;
      detectedLanguages: Record<string, number>;
      licensePreview: string | null;
      packageData: {
        name: string;
        description: string;
        dependencies: string[];
        devDependencies: string[];
      } | null;
      detectedFrameworks: {
        frontend: string[];
        backend: string[];
        orm: string[];
        styling: string[];
        stateManagement: string[];
        testing: string[];
        database: string[];
        deployment: string[];
        utility: string[];
        versions: Record<string, string>;
      } | null;
      directoryTree: string; 
      environmentVariables?: string[];
    }

    const SAFETY_SETTINGS = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    export async function generateReadmeContentWithAI(metadata: RepoMetadata): Promise<string> {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in environment variables.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", safetySettings: SAFETY_SETTINGS }); // Use gemini-pro for higher quality, or gemini-flash if cost/speed is critical

       
      const prompt = `
    You are an expert software developer and technical writer tasked with generating a professional, high-quality GitHub README.md file.
    The README should be comprehensive, well-structured, clear, concise, and persuasive.
    It MUST NOT include emojis, overly casual language, or unnecessary fluff. Focus on delivering value and information.

    Use the following extracted project metadata to generate the README:

    --- METADATA ---
    Project Name: ${metadata.repoName}
    ${metadata.initialDescription ? `Initial Description (from existing README or package.json): ${metadata.initialDescription}\n` : ''}
    ${metadata.packageData?.description ? `Package Description: ${metadata.packageData.description}\n` : ''}
    Detected Languages (File Counts): ${JSON.stringify(metadata.detectedLanguages, null, 2)}
    License Preview: ${metadata.licensePreview || 'Not detected'}

    Detected Key Technologies:
    ${metadata.detectedFrameworks ? Object.entries(metadata.detectedFrameworks)
        .filter(([key, val]) => key !== 'versions' && Array.isArray(val) && val.length > 0)
        .map(([category, deps]) => `- ${category.charAt(0).toUpperCase() + category.slice(1)}: ${(deps as string[]).map(dep => `${dep} (v${metadata.detectedFrameworks!.versions[dep] || 'unknown'})`).join(', ')}`)
        .join('\n') : 'Not explicitly detected from package.json'}

    Environment Variables Detected: ${metadata.environmentVariables?.length ? metadata.environmentVariables.join(', ') : 'None extracted'}

    Project Directory Structure (up to 3 levels, filtered):
    \`\`\`
    ${metadata.directoryTree || 'Not available'}
    \`\`\`
    --- END METADATA ---


    Based on this metadata, generate a README.md that includes the following sections, in this order:

    1.  **Project Title**: \`# ${metadata.repoName}\`
    2.  **Description**: A concise, professional, and compelling overview of the project. Explain its purpose, what problem it solves, and its core functionality. Avoid jargon and focus on clarity. This should be a few paragraphs.
    3.  **Features**: A bulleted list of the key features. Infer these heavily from the directory structure, component names, and detected technologies. Avoid being too generic.
    4.  **System Architecture / Design**: If the project structure or dependencies suggest a complex web app, backend, or distributed system, briefly outline its architecture here. Otherwise, optionally skip.
    5.  **Tech Stack**: A list of the main technologies used, categorized (e.g., Frontend, Backend, Database, Styling, State Management, Testing), including the major versions if provided. Use clear, readable text, not badges unless specifically requested by user later.
    6.  **Project Structure**: Briefly explain the main directories and their purpose, referencing the provided directory tree. Present the directory tree in a markdown code block.
    7.  **Getting Started**:
        *   **Prerequisites**: List any software required. Infer from tech stack.
        *   **Installation**: Provide specific, runnable commands based on detected package managers (if bun.lockb is in tree, use bun; if yarn.lock, use yarn; if pip, use pip, else npm).
        *   **Running Locally**: Runnable commands to start the development server.
        *   **Environment Variables**: Detail the roles of the specific Environment Variables Detected above and explain how to configure them securely.
    8.  **Usage**: Explain how to use the project effectively, with examples if simple.
    9.  **License**: State the detected license (e.g., "Distributed under the MIT License. See \`LICENSE\` for more information.").
    10. **Contact**: A placeholder for contact information (e.g., "Your Name - your@email.com - Your LinkedIn/GitHub link").

    **Important Guidelines for Generation**:
    *   **Markdown Format**: Ensure correct markdown syntax for headers, lists, code blocks, etc.
    *   **Professional Tone**: Maintain a formal, technical, and professional tone throughout.
    *   **Accuracy**: Only include information that can be reasonably inferred from the provided metadata. If something is truly unknown, state it as "Not applicable" or omit gracefully.
    *   **Constraints**:
        - Do NOT include placeholders (like <your_key>) unless explicitly asked or structurally necessary. Try to use standard descriptive defaults like \`YOUR_ACTUAL_KEY\`.
        - Ensure all shell commands provided are highly specific and runnable rather than vague.
        - Analyze the tech versions to guide compatibility instructions.
    *   **No Emojis**: Absolutely no emojis or whimsical characters.
    *   **Conciseness**: Be clear and to the point.
    *   **Code Blocks**: Use appropriate syntax highlighting for code blocks (e.g., \`\`\`bash\`, \`\`\`typescript\`).


    Generate the complete README.md content now.
    `;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        if (response.promptFeedback && response.promptFeedback.blockReason) {
           throw new Error(`AI API Error: Generation blocked by safety settings (${response.promptFeedback.blockReason})`);
        }
        
        const text = response.text();
        return text;
      } catch (err: unknown) {
        const error = err as Error;

        if (error.message && error.message.includes('Quota')) {
          throw new Error('AI API Error: Service quota exceeded for the generative AI provider.');
        } else if (error.message && error.message.toLowerCase().includes('safety')) {
          throw new Error('AI API Error: Content flagged by safety filters.');
        } else if (!error.message.includes('AI API Error')) {
          throw new Error(`AI API Error: ${error.message}`);
        }
        throw error;
      }
    }