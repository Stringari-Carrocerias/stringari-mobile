import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("(Verify Home)", async ({page}) => {
    await page.goto("/");

    await expect(page).toHaveURL("/");

    await expect(page.locator(".home")).toBeVisible();

    await expect(page.getByRole("button", { name: "Entrar na seção" })).toBeVisible();
    
    await page.getByRole("button", { name: "Entrar na seção" }).click();

    await expect(page).toHaveURL("/modelos");
  });
});
