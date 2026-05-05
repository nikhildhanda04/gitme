# gitme

## Description

gitme is a Next.js project designed to streamline the creation of professional-quality README files for your software repositories. It analyzes your project structure, dependencies, and code to automatically generate a comprehensive and informative README, saving you time and ensuring your project is well-documented. The application leverages AI to provide intelligent suggestions and enhance the content of the generated README files.

## Features

*   **Automated README Generation**: Automatically creates a comprehensive README.md file based on project analysis.
*   **AI-Powered Content Enhancement**: Utilizes AI to provide suggestions and improve the quality of the generated content.
*   **Project Structure Analysis**: Analyzes the project's directory structure and dependencies to generate accurate documentation.
*   **Customizable Output**: Allows for customization of the generated README content to match specific project requirements.
*   **Frontend Interface**: Provides a user-friendly interface for generating and customizing README files.
*   **Authentication**: Secure authentication to protect user data and generated README files.

## Tech Stack

*   **Frontend**:
    *   Next.js: v14.2.4
    *   React: v19.2.4
    *   Tailwind CSS: v4
*   **Backend**:
    *   Node.js
*   **Database**:
    *   PostgreSQL: v8.20.0 (via `pg`)
*   **ORM**:
    *   Prisma: v6.4.1
*   **Utility**:
    *   Zod: v4.3.6
    *   @google/generative-ai: v0.24.1

## Project Structure

```
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── app
│   ├── api
│   │   ├── auth
│   │   │   └── [...all]
│   │   └── generate-readme
│   │       └── route.ts
│   ├── components
│   │   ├── benefits.tsx
│   │   ├── cta-final.tsx
│   │   ├── faq.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   ├── how.tsx
│   │   └── navbar.tsx
│   ├── favicon.ico
│   ├── generate
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── bun.lock
├── eslint.config.mjs
├── generated
│   └── prisma
│       ├── default.d.ts
│       ├── default.js
│       ├── edge.d.ts
│       ├── edge.js
│       ├── index-browser.js
│       ├── index.d.ts
│       ├── index.js
│       ├── libquery_engine-darwin-arm64.dylib.node
│       ├── package.json
│       ├── runtime
│       │   ├── edge-esm.js
│       │   ├── edge.js
│       │   ├── index-browser.d.ts
│       │   ├── index-browser.js
│       │   ├── library.d.ts
│       │   ├── library.js
│       │   ├── react-native.js
│       │   └── wasm.js
│       ├── schema.prisma
│       ├── wasm.d.ts
│       └── wasm.js
├── lib
│   ├── ai-readme-generator.ts
│   ├── auth-client.ts
│   ├── auth.ts
│   ├── prisma.ts
│   └── utils.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prisma
│   └── schema.prisma
├── public
│   ├── file.svg
│   ├── gitme_logo.png
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── skills-lock.json
└── tsconfig.json
```

Key directories:

*   `app`: Contains the Next.js application code, including pages, components, and API routes.
*   `lib`: Contains utility functions, authentication logic, and Prisma client setup.
*   `prisma`: Contains the Prisma schema definition.
*   `public`: Contains static assets such as images and SVG files.

## Getting Started

### Prerequisites

*   Node.js (version compatible with Next.js and dependencies)
*   PostgreSQL
*   Bun (package manager - detected by `bun.lock`)

### Installation

```bash
bun install
```

### Running Locally

```bash
bun dev
```

This will start the development server at `http://localhost:3000`.

### Environment Variables

This project requires environment variables to function correctly. While specific variables are not listed, you will likely need to configure:

*   Database connection details for PostgreSQL.
*   API keys for the AI-powered README generator (e.g., Google Generative AI).
*   Authentication secrets.

Ensure these variables are set securely in your environment (e.g., using `.env` files for local development, and environment variables in your deployment platform). Example:

```
DATABASE_URL="postgresql://user:password@host:port/database"
GOOGLE_GENERATIVE_AI_API_KEY="YOUR_ACTUAL_KEY"
NEXTAUTH_SECRET="YOUR_ACTUAL_SECRET"
NEXTAUTH_URL="http://localhost:3000"
```

## Usage

After starting the development server, navigate to `http://localhost:3000` in your browser. You can then use the application's interface to generate README files for your projects. The `app/generate/page.tsx` file likely contains the core logic for interacting with the AI README generator.

## License

Not detected

## Contact

Your Name - nikhildhanda84@email.com 
