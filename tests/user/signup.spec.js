import { test, expect } from "@playwright/test";

import { generateRandomEmail } from "@/utils/tests/onlyForTests";

const TEST_PASSWORD = process.env.TEST_PASSWORD;

test.describe("Signup", () => {
  test("(Success) Usuário faz cadastro", async ({ page }) => {
    await page.goto("/cadastro");

    await page.getByPlaceholder("seu@email.com").fill(generateRandomEmail());

    await page.getByPlaceholder("Digite sua senha").fill(TEST_PASSWORD);

    await page.getByRole("button", { name: "Criar nova conta" }).click();

    await expect(page).toHaveURL("/login");

    await expect(
      page.getByText("Cadastro realizado com sucesso."),
    ).toBeVisible();
  });

  test("(Error) Email inválido", async ({ page }) => {
    await page.goto("/cadastro");

    await page.getByPlaceholder("seu@email.com").fill(".");

    await page.getByPlaceholder("Digite sua senha").fill(TEST_PASSWORD);

    await page.getByRole("button", { name: "Criar nova conta" }).click();

    await expect(page.getByText("Digite um e-mail válido.")).toBeVisible();

    await expect(page).toHaveURL("/cadastro");
  });

  test("(Error) Senha pequena -> A senha deve ter 8 caracteres.", async ({
    page,
  }) => {
    await page.goto("/cadastro");

    await page.getByPlaceholder("seu@email.com").fill(generateRandomEmail());

    await page.getByPlaceholder("Digite sua senha").fill(".");

    await page.getByRole("button", { name: "Criar nova conta" }).click();

    await expect(
      page.getByText("A senha deve ter 8 caracteres."),
    ).toBeVisible();

    await expect(page).toHaveURL("/cadastro");
  });

  test("(Layout) Redirecionamento correto", async ({ page }) => {
    await page.goto("/cadastro");

    await page.locator(".login-link").click();

    await expect(page).toHaveURL("/login");
  });
});
