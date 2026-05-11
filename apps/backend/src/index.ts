import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { convertIpToUint32 } from "@radixwatch/core";
import { createAnalyzeRoute } from "./routes/analyze";

const ONE_GB = 1024 * 1024 * 1024;

const app = new Elysia()
  .onError(({ code, error, set }) => {
    if (code === "PARSE" && error.message.includes("413")) {
      set.status = 413;
      return { error: `File too large. Maximum size is ${ONE_GB / 1024 / 1024 / 1024} GB` };
    }
  })
  .use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    })
  )
  .use(createAnalyzeRoute())
  .get("/", () => "RadixWatch API is running!")
  .get("/test", () => {
    const ip = "192.168.1.100";
    const uint32 = convertIpToUint32(ip);
    return {
      message: "Testing shared core package",
      ip,
      uint32,
    };
  })
  .listen({
    port: 3000,
    maxRequestBodySize: 1024 * 1024 * 1024, // 1 GB
  });

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
