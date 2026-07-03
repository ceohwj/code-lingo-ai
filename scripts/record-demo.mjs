import { existsSync } from "node:fs";
import { mkdir, readFile, rename, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const DEFAULT_APP_URL = "http://localhost:3000";
const LOCALHOST_FALLBACK_URL = "http://127.0.0.1:3000";
const requestedAppUrl = process.env.CODELINGO_DEMO_URL ?? DEFAULT_APP_URL;
const BROWSER_CHANNEL = process.env.PLAYWRIGHT_BROWSER_CHANNEL ?? "chrome";
const VIEWPORT = { width: 1440, height: 900 };
const OPENING_PAUSE_MS = 2500;
const CATEGORY_PAUSE_MS = 1500;
const OPTION_PAUSE_MS = 500;
const FEATURED_FEEDBACK_PAUSE_MS = 2500;
const BETWEEN_QUESTIONS_PAUSE_MS = 1000;
const RESULTS_PAUSE_MS = 3000;
const FINAL_MISSION_PAUSE_MS = 2000;
const FINAL_DASHBOARD_PAUSE_MS = 3500;
const CLOSING_PAUSE_MS = 3000;

const answerPlan = [0, 0];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const artifactDir = path.join(projectRoot, "demo-artifacts");
const finalVideoPath = path.join(artifactDir, "codelingo-demo.webm");

async function main() {
  const appUrl = await resolveReachableAppUrl();
  await mkdir(artifactDir, { recursive: true });
  await rm(finalVideoPath, { force: true });

  const browser = await launchBrowser();
  await warmHomepage(browser, appUrl);

  const recordingStartedAt = Date.now();
  const context = await browser.newContext({
    recordVideo: {
      dir: artifactDir,
      size: VIEWPORT
    },
    viewport: VIEWPORT
  });
  await context.addInitScript(() => window.localStorage.clear());

  const page = await context.newPage();

  try {
    await page.goto(appUrl, { waitUntil: "networkidle" });
    await waitForDashboard(page);
    await readablePause(page, OPENING_PAUSE_MS);

    await seedNearCompletePythonProgress(page);
    await page.getByRole("button", { name: /Python/i }).first().click();
    await page.getByRole("heading", { name: /Python Basics/i }).waitFor();
    await waitForStablePage(page);
    await readablePause(page, CATEGORY_PAUSE_MS);

    for (let index = 0; index < answerPlan.length; index += 1) {
      await answerCurrentQuestion(page, answerPlan[index], OPTION_PAUSE_MS, FEATURED_FEEDBACK_PAUSE_MS);

      await page.getByRole("button", { name: /Continue/i }).click();
      await waitForStablePage(page);
      await readablePause(page, BETWEEN_QUESTIONS_PAUSE_MS);
    }

    await page.getByRole("heading", { name: /XP earned/i }).waitFor();
    await waitForStablePage(page);
    await readablePause(page, RESULTS_PAUSE_MS);

    await page.getByRole("button", { name: /Change category/i }).click();
    await waitForDashboard(page);
    await page.getByText(/Today&apos;s mission|Today's mission/i).scrollIntoViewIfNeeded();
    await readablePause(page, FINAL_MISSION_PAUSE_MS);
    await page.getByText(/Learning Stats/i).scrollIntoViewIfNeeded();
    await waitForStablePage(page);
    await readablePause(page, FINAL_DASHBOARD_PAUSE_MS);
    await readablePause(page, CLOSING_PAUSE_MS);
  } finally {
    const video = page.video();
    await context.close();
    await browser.close();

    if (!video) {
      throw new Error("Playwright did not create a video for the demo page.");
    }

    const recordedVideoPath = await video.path();
    await rename(recordedVideoPath, finalVideoPath);
  }

  if (!existsSync(finalVideoPath)) {
    throw new Error("Demo recording finished, but the expected video file was not created.");
  }

  const durationSeconds = await getWebmDurationSeconds(finalVideoPath)
    ?? Math.round((Date.now() - recordingStartedAt) / 1000);
  console.log("Demo video saved to " + path.relative(projectRoot, finalVideoPath));
  console.log("Demo video duration: " + durationSeconds + " seconds");
}

async function warmHomepage(browser, appUrl) {
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  try {
    await page.goto(appUrl, { waitUntil: "networkidle" });
    await page.evaluate(() => window.localStorage.clear());
    await page.reload({ waitUntil: "networkidle" });
    await waitForDashboard(page);
  } finally {
    await context.close();
  }
}

async function seedNearCompletePythonProgress(page) {
  await page.evaluate(() => {
    window.localStorage.setItem(
      "codelingo-ai-python-basics-progress",
      JSON.stringify({
        schemaVersion: 2,
        categoryId: "python",
        completedQuestions: [],
        currentQuestionIndex: 8,
        isSubmitted: false,
        mode: "quiz",
        selectedOptionIndex: null,
        xp: 0,
        xpByDifficulty: {
          easy: 10,
          hard: 25,
          medium: 15
        }
      })
    );
  });
}

async function resolveReachableAppUrl() {
  if (await canReach(requestedAppUrl)) {
    return requestedAppUrl;
  }

  if (requestedAppUrl === DEFAULT_APP_URL && await canReach(LOCALHOST_FALLBACK_URL)) {
    return LOCALHOST_FALLBACK_URL;
  }

  throw new Error(
    "CodeLingo AI dev server is not reachable at " + requestedAppUrl + ". Start it with `npm run dev` before running `npm run demo:record`."
  );
}

async function canReach(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });

    return response.ok;
  } catch (error) {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function launchBrowser() {
  try {
    return await chromium.launch({
      channel: BROWSER_CHANNEL,
      headless: true
    });
  } catch (channelError) {
    try {
      return await chromium.launch({ headless: true });
    } catch (bundledError) {
      throw new Error(
        "Unable to launch Playwright Chromium. Install a supported browser with `npx playwright install chromium` or set PLAYWRIGHT_BROWSER_CHANNEL to an installed browser channel. " +
        "Channel error: " + channelError.message + " Bundled browser error: " + bundledError.message
      );
    }
  }
}

async function answerCurrentQuestion(page, optionIndex, optionPause, feedbackPause) {
  const options = page.getByRole("radio");
  await options.nth(optionIndex).click();
  await readablePause(page, optionPause);
  await page.getByRole("button", { name: /Check answer/i }).click();
  const explanation = page.getByRole("status", { name: /Answer explanation/i });
  await explanation.waitFor();
  await explanation.scrollIntoViewIfNeeded();
  await waitForStablePage(page);
  await readablePause(page, feedbackPause);
}

async function waitForDashboard(page) {
  await page.getByRole("heading", { name: "Dashboard" }).waitFor();
  await page.getByText(/Developer learning coach/i).waitFor();
  await page.getByText(/Today&apos;s mission|Today's mission/i).waitFor();
  await waitForStablePage(page);
}

async function waitForStablePage(page) {
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function readablePause(page, duration) {
  await page.waitForTimeout(duration);
}

async function getWebmDurationSeconds(videoPath) {
  const buffer = await readFile(videoPath);
  const durationElementId = [0x44, 0x89];

  for (let index = 0; index < buffer.length - 10; index += 1) {
    if (buffer[index] !== durationElementId[0] || buffer[index + 1] !== durationElementId[1]) {
      continue;
    }

    const length = readEbmlVint(buffer, index + 2);
    const valueStart = index + 2 + length.bytesRead;

    if (length.value === 4) {
      return Math.round(buffer.readFloatBE(valueStart) / 1000);
    }

    if (length.value === 8) {
      return Math.round(buffer.readDoubleBE(valueStart) / 1000);
    }
  }

  return null;
}

function readEbmlVint(buffer, offset) {
  const firstByte = buffer[offset];
  let marker = 0x80;
  let bytesRead = 1;

  while (bytesRead <= 8 && (firstByte & marker) === 0) {
    marker >>= 1;
    bytesRead += 1;
  }

  let value = firstByte & (marker - 1);

  for (let byteIndex = 1; byteIndex < bytesRead; byteIndex += 1) {
    value = value * 256 + buffer[offset + byteIndex];
  }

  return { bytesRead, value };
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
