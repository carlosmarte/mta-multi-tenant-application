// Load environment variables
import { config } from "dotenv";
import { existsSync } from "fs";

// In production, try to load from /etc/secrets/.env if it exists
// Otherwise, rely on environment variables set by the hosting platform (e.g., Render.com)
if (process.env.NODE_ENV === "production") {
  const secretsPath = "/etc/secrets/.env";
  if (existsSync(secretsPath)) {
    config({ path: secretsPath });
    console.log(`[ENV] Loaded environment from ${secretsPath}`);
  } else {
    console.log("[ENV] Using environment variables from hosting platform");
  }
} else {
  // In development, load from local .env file
  config();
}

console.log({
  DATABASE_URL: !!process.env.DATABASE_URL,
  POSTGRES_USER: !!process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: !!process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: !!process.env.POSTGRES_HOST,
  POSTGRES_PORT: !!process.env.POSTGRES_PORT,
  POSTGRES_DB: !!process.env.POSTGRES_DB,
});

import { createServer, launchServer } from "@thinkeloquent/skeleton";
// Import both backend and frontend plugins from the backend module
import {
  frontendPlugin,
  backendPlugin,
} from "@thinkeloquent/figma-component-inspector-backend";

// Create Fastify instance with default configuration
const fastify = await createServer();

// Register Figma Component Inspector backend
await fastify.register(backendPlugin);

// Register Figma Component Inspector frontend
await fastify.register(frontendPlugin);

// Add application-specific routes here
fastify.get("/", async () => {
  return { message: "Hello from MTA workspace! v2" };
});

fastify.get("/health", async () => {
  // Check database environment variables
  const dbEnvVars = {
    POSTGRES_USER: !!process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: !!process.env.POSTGRES_PASSWORD,
    POSTGRES_HOST: !!process.env.POSTGRES_HOST,
    POSTGRES_PORT: !!process.env.POSTGRES_PORT,
    POSTGRES_DB: !!process.env.POSTGRES_DB,
    POSTGRES_SCHEMA: !!process.env.POSTGRES_SCHEMA,
    DATABASE_URL: !!process.env.DATABASE_URL,
  };

  const missingVars = Object.entries(dbEnvVars)
    .filter(
      ([key, exists]) =>
        !exists && key !== "POSTGRES_SCHEMA" && key !== "DATABASE_URL"
    )
    .map(([key]) => key);

  const hasRequiredDbConfig =
    process.env.DATABASE_URL ||
    (process.env.POSTGRES_USER &&
      process.env.POSTGRES_PASSWORD &&
      process.env.POSTGRES_HOST &&
      process.env.POSTGRES_PORT &&
      process.env.POSTGRES_DB);

  return {
    status: hasRequiredDbConfig ? "ok" : "error",
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || "development",
      database: {
        configured: hasRequiredDbConfig,
        variables: dbEnvVars,
        missing: missingVars.length > 0 ? missingVars : undefined,
      },
      DATABASE_URL: !!process.env.DATABASE_URL,
      POSTGRES_USER: !!process.env.POSTGRES_USER,
      POSTGRES_PASSWORD: !!process.env.POSTGRES_PASSWORD,
      POSTGRES_HOST: !!process.env.POSTGRES_HOST,
      POSTGRES_PORT: !!process.env.POSTGRES_PORT,
      POSTGRES_DB: !!process.env.POSTGRES_DB,
    },
  };
});

// Launch server with environment configuration
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const host = process.env.HOST || "0.0.0.0";

await launchServer(fastify, { port, host });
