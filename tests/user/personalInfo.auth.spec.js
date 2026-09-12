import { test, expect } from "@playwright/test";
import { generateRandomEmail, getPersonalHtml } from "@/utils/tests/onlyForTests";

test.describe("Informações Pessoais", () => {
  // ========== VERIFY ==========

  test("(Verify) Verifica todos os campos", async ({ page }) => {
    const { image, button } = getPersonalHtml(page);
    await page.goto("/informacoes-pessoais");

    await expect(page).toHaveURL("/informacoes-pessoais");

    await expect(
      page.getByRole("heading", { name: "Informações Pessoais" }),
    ).toBeVisible();

    await expect(page.getByTestId("personalTest-email")).not.toHaveText(
      "Toque para adicionar",
    );

    await expect(image).not.toBeVisible();

    await expect(page.getByText("Adicionar")).toBeVisible();

    await expect(button).toBeVisible();
  });

  // ========== SUCCESS ==========

  test("(Success) Botão 'Salvar Alterações' funciona mesmo sem alterar nada", async ({
    page,
  }) => {
    const { button } = getPersonalHtml(page);

    await page.goto("/informacoes-pessoais");

    await button.click();

    await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
  });

  test("(Success) Altera imagem", async ({ page }) => {
    const { image, button } = getPersonalHtml(page);

    await page.goto("/informacoes-pessoais");

    await image.setInputFiles("./src/assets/icons/foto-teste.png");
    
    await expect(page.getByText("Editar")).toBeVisible();

    await button.click();

    await expect(page.getByText("Upload realizado com sucesso.")).toBeVisible();
    
    expect(await image).toBeTruthy();

    await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
    
    await page.reload();
    
    await expect(page.getByText("Editar")).toBeVisible();
    
  });

  test("(Success) Altera e-mail", async ({ page }) => {
    const { button, email, emailInput } =
      getPersonalHtml(page);

    await page.goto("/informacoes-pessoais");

    await expect(email).toBeVisible();

    const emailBefore = await emailInput.inputValue();

    await emailInput.fill(generateRandomEmail());

    await button.click();

    await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();

    expect(await emailInput.inputValue()).not.toBe(emailBefore);

    await emailInput.fill(emailBefore);

    await button.click();

    await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
  });

  test("(Success) Altera nome completo", async ({ page }) => {
    const { button, name, nameInput } = getPersonalHtml(page);

    await page.goto("/informacoes-pessoais");

    await expect(name).toBeVisible();

    await nameInput.fill("Nome Teste");

    await button.click();

    await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();

    expect(await nameInput.inputValue()).toBe("Nome Teste");

    await nameInput.fill("");

    await button.click();

    await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
  });

  test("(Success) Altera telefone", async ({ page }) => {
    const { button, phone, phoneInput } = getPersonalHtml(page);

    await page.goto("/informacoes-pessoais");

    await expect(phone).toBeVisible();

    await phoneInput.fill("(12) 93456-7890");

    await button.click();

    await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();

    expect(await phoneInput.inputValue()).toBe("(12) 93456-7890");

    await phoneInput.fill("");

    await button.click();

    await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
  });

  // ========== ERROR ==========

  test("(Error) Erro ao mudar e-mail", async ({ page }) => {
    const { button, email, emailInput } = getPersonalHtml(page);

    await page.goto("/informacoes-pessoais");

    await expect(email).toBeVisible();

    const emailBefore = await emailInput.inputValue();

    await emailInput.fill("a");

    await button.click();

    await expect(page.getByText("Email inválido")).toBeVisible();

    expect(await emailInput.inputValue()).toBe(emailBefore);
  });

  test("(Error) Erro ao adicionar nome completo", async ({ page }) => {
    const { button, name, nameInput } = getPersonalHtml(page);

    await page.goto("/informacoes-pessoais");

    await expect(name).toBeVisible();

    await nameInput.fill("Teste1234");

    await button.click();

    await expect(
      page.getByText("O nome completo não pode conter números."),
    ).toBeVisible();

    expect(await nameInput.inputValue()).not.toBe("Teste1234");
  });

  test("(Error) Erro ao adicionar telefone", async ({ page }) => {
    const { button, phone, phoneInput } = getPersonalHtml(page);

    await page.goto("/informacoes-pessoais");

    await expect(phone).toBeVisible();

    await phoneInput.fill("1");

    await button.click();

    await expect(page.getByText("Telefone inválido")).toBeVisible();

    expect(await phoneInput.inputValue()).not.toBe("1");
  });
});
