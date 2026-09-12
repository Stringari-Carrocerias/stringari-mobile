import { test, expect } from "@playwright/test";

const SUPERUSER_EMAIL = process.env.SUPERUSER_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

test.describe("Login", () => {
  // ======= TESTE (Login) =======

  test("(Success) Usuário faz login", async ({ page }) => {
    await page.goto("/login");

    await page.getByPlaceholder("seu@email.com").fill(SUPERUSER_EMAIL);

    await page.getByPlaceholder("Digite sua senha").fill(TEST_PASSWORD);

    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page.getByText("Login realizado com sucesso.")).toBeVisible();

    await expect(page).toHaveURL("/");
  });

  // ======= TESTE (Login) - Mensagens de erro =======

  test("(Error) Email - Email inválido", async ({ page }) => {
    await page.goto("/login");

    await page.getByPlaceholder("seu@email.com").fill("alfabeto@a.com");

    await page.getByPlaceholder("Digite sua senha").fill(TEST_PASSWORD);

    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page.getByText("Erro ao realizar login.")).toBeVisible();

    await expect(page).toHaveURL("/login");
  });

  test("(Error) Senha - Senha inválida", async ({ page }) => {
    await page.goto("/login");

    await page.getByPlaceholder("seu@email.com").fill(SUPERUSER_EMAIL);

    await page.getByPlaceholder("Digite sua senha").fill("1");

    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page.getByText("Senha inválida")).toBeVisible();

    await expect(page).toHaveURL("/login");
  });

  test("(Error) Senha - Login inválido", async ({ page }) => {
    await page.goto("/login");

    await page.getByPlaceholder("seu@email.com").fill(SUPERUSER_EMAIL);

    await page.getByPlaceholder("Digite sua senha").fill("senha-inválida");

    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page.getByText("Erro ao realizar login.")).toBeVisible();

    await expect(page).toHaveURL("/login");
  });
});
