import test from "ava";
import { chromium } from "playwright";

let page;
let browser;

test.before(async () => {
  browser = process.env.GITHUB_ACTIONS
    ? await chromium.launch()
    : await chromium.launch({ headless: false });
  page = await browser.newPage();

  await page
    .goto("https://e2e-boilerplate.github.io/sandbox/", {
      waitUntil: "networkidle0"
    })
    .catch(() => {});
});

test.after(() => {
  if (!page.isClosed()) {
    browser.close();
  }
});

test("should be on the sandbox", async t => {
  await page.waitFor("h1");
  const title = await page.$eval("h1", el => el.textContent);

  t.is(await page.title(), "Sandbox");
  t.is(title, "Sandbox");
});
