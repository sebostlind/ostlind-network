import { spawn } from "node:child_process";
import { access, mkdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = 4321;
const origin = `http://127.0.0.1:${port}`;
const evidence = path.join(root, "artifacts/verify");

const required = [
  ["title", "<title>Östlind &amp; Co Network</title>"],
  ["logo", 'src="/logo.png"'],
  ["favicon", 'rel="icon"'],
  ["email", "mailto:sebastian@ostlind.net"],
  ["email text", "sebastian@ostlind.net"],
  ["domain label", "ostlind.network"],
  ["wordmark", "wordmark"],
  ["hero", "organizational psychology, executive coaching, and leadership consulting"],
  ["coaching", "executive coaching"],
  ["leadership", "leadership consulting"],
  ["psychology", "organizational psychology"],
  ["person", "Sebastian Östlind"],
  ["approach line", "thoughtful, practical, and confidential"],
  ["og image", "https://ostlind.network/logo.png"],
];

const forbidden = [
  ["www host", "www."],
  ["tel link", "tel:"],
  ["phone word", /phone/i],
  ["footer", /<footer[\s>]/i],
];

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited ${code}`));
    });
  });
}

async function waitForPage() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`${origin}/`);
      if (response.ok) return response;
    } catch {}
    await delay(200);
  }
  throw new Error(`No page at ${origin} after 10 seconds.`);
}

function shot(name, size) {
  const file = path.join(evidence, `${name}.png`);
  const profile = path.join("/tmp", `ostlind-chrome-${name}`);
  return new Promise((resolve, reject) => {
    const child = spawn(
      "google-chrome",
      [
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        `--user-data-dir=${profile}`,
        "--virtual-time-budget=4000",
        `--window-size=${size}`,
        `--screenshot=${file}`,
        `${origin}/`,
      ],
      { cwd: evidence, stdio: "ignore", detached: true },
    );

    let settled = false;
    let lastSize = 0;
    const started = Date.now();

    const finish = (error) => {
      if (settled) return;
      settled = true;
      clearInterval(timer);
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch {
        try {
          child.kill("SIGKILL");
        } catch {}
      }
      rm(profile, { recursive: true, force: true }).catch(() => {});
      if (error) reject(error);
      else resolve(file);
    };

    const timer = setInterval(async () => {
      try {
        const info = await stat(file);
        if (info.size > 1000 && info.size === lastSize) finish();
        lastSize = info.size;
      } catch {}
      if (!settled && Date.now() - started > 20000) {
        finish(new Error(`Screenshot ${name} timed out.`));
      }
    }, 300);

    child.on("error", (error) => finish(error));
  });
}

const lines = [];
const failures = [];

function record(name, ok, detail = "") {
  const status = ok ? "PASS" : "FAIL";
  const suffix = detail ? `: ${detail}` : "";
  const line = `${status} ${name}${suffix}`;
  lines.push(line);
  console.log(line);
  if (!ok) failures.push(name);
}

let preview;

try {
  try {
    await fetch(`${origin}/`);
    throw new Error(`Port ${port} is already in use. Stop that process, then run verify again.`);
  } catch (error) {
    if (error instanceof Error && error.message.includes("already in use")) throw error;
  }

  await mkdir(evidence, { recursive: true });
  await run("npm", ["run", "build"]);

  preview = spawn("npx", ["astro", "preview", "--host", "127.0.0.1", "--port", String(port)], {
    cwd: root,
    stdio: "ignore",
    detached: true,
  });

  const response = await waitForPage();
  const html = await response.text();
  await writeFile(path.join(evidence, "index.html"), html);

  record("http status", response.status === 200, String(response.status));
  for (const [name, needle] of required) {
    record(name, html.includes(needle));
  }
  for (const [name, needle] of forbidden) {
    const found = needle instanceof RegExp ? needle.test(html) : html.includes(needle);
    record(`absent ${name}`, !found);
  }

  const logoResponse = await fetch(`${origin}/logo.png`);
  const logoBytes = Buffer.from(await logoResponse.arrayBuffer());
  const png =
    logoBytes.length > 8 && logoBytes[0] === 0x89 && logoBytes[1] === 0x50 && logoBytes[2] === 0x4e && logoBytes[3] === 0x47;
  record("logo response", logoResponse.ok && png, `${logoResponse.status}, ${logoBytes.length} bytes`);
  await writeFile(path.join(evidence, "logo.png"), logoBytes);

  await access(path.join(root, "dist/index.html"));
  await access(path.join(root, "dist/logo.png"));
  record("dist files", true);

  await shot("desktop", "1440,3200");
  await shot("mobile", "390,3400");
  record("screenshots", true, "artifacts/verify/desktop.png and mobile.png");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  record("verify run", false, message);
} finally {
  if (preview) {
    try {
      process.kill(-preview.pid, "SIGTERM");
    } catch {
      try {
        preview.kill("SIGTERM");
      } catch {}
    }
    await delay(400);
    try {
      process.kill(-preview.pid, "SIGKILL");
    } catch {}
  }
  await mkdir(evidence, { recursive: true });
  const report = [`origin: ${origin}`, `failures: ${failures.length}`, ...lines, ""].join("\n");
  await writeFile(path.join(evidence, "report.txt"), report);
}

process.exit(failures.length > 0 ? 1 : 0);
