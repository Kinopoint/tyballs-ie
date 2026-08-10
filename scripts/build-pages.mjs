import { spawn } from "node:child_process";
import { mkdir, readdir, rename, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const serverDirectories = [
  [join(root, "app/(frontend)/api"), join(root, ".pages-build/frontend-api")],
  [join(root, "app/(frontend)/events/[slug]"), join(root, ".pages-build/event-detail")],
  [join(root, "app/(frontend)/venues/[slug]"), join(root, ".pages-build/venue-detail")],
  [join(root, "app/(payload)"), join(root, ".pages-build/payload")],
];

async function removeConflictCopies(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const names = new Set(entries.map((entry) => entry.name));

  for (const entry of entries) {
    const conflictCopy = entry.name.match(/^(.*) \d+(\.[^.]*)?$/);

    if (conflictCopy) {
      const canonicalName = `${conflictCopy[1]}${conflictCopy[2] ?? ""}`;

      if (names.has(canonicalName)) {
        await rm(join(directory, entry.name), { recursive: entry.isDirectory(), force: true });
        continue;
      }
    }

    if (entry.isDirectory()) {
      await removeConflictCopies(join(directory, entry.name));
    }
  }
}

await rm(join(root, ".pages-build"), { recursive: true, force: true });
await rm(join(root, "out"), { recursive: true, force: true });
await mkdir(join(root, ".pages-build"), { recursive: true });

for (const [source, holding] of serverDirectories) {
  await rename(source, holding);
}

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

  await removeConflictCopies(join(root, "out"));
} finally {
  for (const [source, holding] of serverDirectories) {
    await rename(holding, source);
  }
  await rm(join(root, ".pages-build"), { recursive: true, force: true });
}
