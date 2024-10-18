import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // visit page locally
  await page.goto("http://localhost:4321/");

  // test open chat button
  await expect(page.getByRole("button", { name: "Open" })).toBeVisible();
  await page.getByRole("button", { name: "Open" }).click();

  // test that clicking open causes the chatbot to show
  await expect(page.getByRole("heading", { name: "Cody" })).toBeVisible();
  await expect(page.getByText("Howdy from USA!")).toBeVisible();
  await expect(page.getByPlaceholder("your message")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send" })).toBeVisible();

  // test sending a message
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("Heyyyy!");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByText("Heyyyy!")).toBeVisible();

  // test closing the chatbot
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("button", { name: "Open" })).toBeVisible();
  await page.locator("html").click();
});
