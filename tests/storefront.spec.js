import { test, expect } from "@playwright/test";

test("shopping journey preserves variants, quantities, and completes a demo checkout", async ({
  page,
}, testInfo) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "A little better, every sip." }),
  ).toBeVisible();
  await page.locator(".product-card").first().click();
  await page.getByRole("button", { name: "Select Ocean" }).click();
  await page
    .getByRole("button", { name: "Increase quantity", exact: true })
    .click();
  await page.getByRole("button", { name: "Add to bag — $498" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByText("Ocean · Water filter")).toBeVisible();
  await page.getByRole("button", { name: "Close Your bag" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Open bag, 2 items" }).click();
  await page.getByRole("link", { name: "Continue to checkout" }).click();
  await expect(
    page.getByRole("heading", { name: "A fresh start." }),
  ).toBeVisible();
  await page.screenshot({
    path: `test-results/checkout-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Review your order" }).click();
  await expect(
    page.getByRole("heading", { name: "Let’s start with you." }),
  ).toBeVisible();
  await page
    .getByLabel("Email address", { exact: true })
    .fill("tester@example.com");
  await page.getByLabel("First name", { exact: true }).fill("Alex");
  await page.getByLabel("Last name", { exact: true }).fill("River");
  await page
    .getByLabel("Street address", { exact: true })
    .fill("10 Water Street");
  await page.getByLabel("City", { exact: true }).fill("Portland");
  await page.getByLabel("State / region", { exact: true }).fill("Oregon");
  await page.getByLabel("ZIP / postal code", { exact: true }).fill("97201");
  await page.getByRole("radio", { name: /Express delivery/ }).check();
  await page.getByRole("button", { name: "Review your order" }).click();
  await expect(page.getByText("tester@example.com")).toBeVisible();
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await expect(page.getByLabel("First name", { exact: true })).toHaveValue(
    "Alex",
  );
  await page.getByRole("button", { name: "Review your order" }).click();
  await page
    .getByRole("button", { name: "Confirm demo order · $512.95" })
    .click();
  await expect(
    page.getByRole("heading", { name: "You’re all set." }),
  ).toBeVisible();
  await expect(page.getByText("2 items · $512.95")).toBeVisible();
  expect(
    await page.evaluate(() => JSON.parse(localStorage.getItem("filtra-cart"))),
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test("product finder, empty cart, navigation and responsive layout", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Find your Filtra", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: /In a small space/ }).click();
  await page.getByRole("link", { name: "Explore Filtra Pour" }).click();
  await expect(page.locator(".product-info h1")).toContainText("Filtra Pour");
  await page.getByRole("button", { name: "Add to bag — $59" }).click();
  await page.getByRole("button", { name: "Remove Filtra Pour" }).click();
  await expect(
    page.getByRole("heading", { name: "A fresh start awaits." }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.goto("/#/checkout");
  await expect(
    page.getByRole("heading", { name: "Your bag is taking a breather." }),
  ).toBeVisible();
  await page.goto("/#/product/fresh");
  await expect(page.locator(".product-info h1")).toContainText(
    "Fresh Start Filter",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.screenshot({
    path: `test-results/product-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
