import { test, expect } from "@playwright/test";

test.describe("Modelos", () => {
  test("(Verify) Verifica modelos", async ({ page }) => {
    await page.goto("/modelos");

    await expect(page).toHaveURL("/modelos");

    await expect(page.getByText("Modelos de Carrocerias")).toBeVisible();

    await expect(page.locator(".card").first()).toBeVisible();

    await expect(page.locator("#categorias")).toBeVisible();
  });

  test("(Verify) Verifica se a filtragem está correta", async ({ page }) => {
    await page.goto("/modelos");

    await expect(page.locator(".card").first()).toBeVisible();

    const modelsBefore = await page.locator(".card").count();

    await page.locator("#categorias").selectOption("2");

    await expect(page.locator("#categorias option:checked")).toHaveText(
      "Graneleira",
    );

    await expect(page.locator(".card")).not.toHaveCount(modelsBefore)

    const modelsAfter = await page.locator(".card").count();

    expect(modelsAfter).toBeLessThan(modelsBefore);
  });
});
