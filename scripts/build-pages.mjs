import { spawn } from "node:child_process";
import { mkdir, rename, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const apiDirectory = join(root, "app/api");
const holdingDirectory = join(root, ".pages-build/server-api");

await rm(join(root, ".pages-build"), { recursive: true, force: true });
await rm(join(root, "out"), { recursive: true, force: true });
await mkdir(dirname(holdingDirectory), { recursive: true });
await rename(apiDirectory, holdingDirectory);

try {
  const exitCode = await new Promise((resolve, reject) => {
    const child = spawn(join(root, "node_modules/.bin/next"), ["build"], {
      cwd: root,
      env: {
        ...process.env,
        STATIC_EXPORT: "true",
        NEXT_PUBLIC_STATIC_PREVIEW: "true",
        NEXT_PUBLIC_BASE_PATH: "/tyballs-ie",
      },
      stdio: "inherit",
    });
    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });

  if (exitCode !== 0) {
    throw new Error(`GitHub Pages build failed with exit code ${exitCode}.`);
  }
} finally {
  await rename(holdingDirectory, apiDirectory);
  await rm(join(root, ".pages-build"), { recursive: true, force: true });
}
