import { test, expect } from "@playwright/test";

import { generateRandomEmail } from "@/utils/tests/onlyForTests";

const TEST_PASSWORD = process.env.TEST_PASSWORD;
const SUPERUSER_EMAIL = process.env.SUPERUSER_EMAIL;

test("Experiência do usuário", async ({ page }) => {
  const randomEmail = generateRandomEmail();

  const emailInput = page.getByPlaceholder("seu@email.com");
  const passwordInput = page.getByPlaceholder("Digite sua senha");

  // Signup

  await page.goto("/cadastro");

  await emailInput.fill(randomEmail);

  await passwordInput.fill(TEST_PASSWORD);

  await page.getByRole("button", { name: "Criar nova conta" }).click();

  await expect(page).toHaveURL("/login");

  // Login

  await emailInput.fill(randomEmail);

  await passwordInput.fill(TEST_PASSWORD);

  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page).toHaveURL("/");

  // ==== Sidebars ====

  const leftSideBar = page.getByAltText("hamburger-button");
  const leftSideBarAcess = expect(page.locator(".left-handle-acess"));

  const rightSideBar = page.getByTestId("sidebar-right");
  const rightSideBarAcess = expect(page.locator(".right-handle-acess"));

  const clicarFora = page.getByTestId("Início");

  // Left Sidebar (Verifica-ClicaEntrar-Verifica-ClicarFora-VerificaDentro)

  await expect(leftSideBar).toBeVisible();

  await leftSideBar.click();

  await leftSideBarAcess.toBeVisible();

  await clicarFora.click();

  await leftSideBarAcess.not.toBeVisible();

  // Right Sidebar (Verifica - ClicaEntrar - Verifica - ClicaFora)

  await expect(rightSideBar).toBeVisible();

  await rightSideBar.click();

  await rightSideBarAcess.toBeVisible();

  clicarFora.click();

  await rightSideBarAcess.not.toBeVisible();

  // ==== Informações Pessoais ====

  // Fluxo: (ClicaSideBar -> Verifica se há 'Informações Pessoais' -> ClicaParaEntrar -> Verifica h1 de 'Informações Pessoais' -> Verifica se o e-mail aparece -> Faz o upload de fotos -> Verifica se o botão de editar mudou -> Redireciona para home)

  const personalInfoBar = page.getByText("Informações Pessoais");
  const personalInfoImage = page.getByTestId("personalTest-image");
  const personalInfoButton = page.getByRole("button", {
    name: "Salvar alterações",
  });

  await rightSideBar.click();

  await expect(personalInfoBar).toBeVisible();

  await personalInfoBar.click();

  await expect(
    page.getByRole("heading", { name: "Informações Pessoais" }),
  ).toBeVisible();

  await expect(page.getByTestId("personalTest-email")).toBeVisible();

  await expect(personalInfoImage).not.toBeVisible();

  await personalInfoImage.setInputFiles("./src/assets/icons/foto-teste.png");

  await personalInfoButton.click();

  await expect(page.getByText("Editar")).toBeVisible();

  await page.locator(".close-icon").click();

  // ==== Home ====

  await expect(page).toHaveURL("/");

  await page.getByRole("button", { name: "Entrar na seção" }).click();

  // ==== Modelos ====

  await expect(page).toHaveURL("/modelos");

  await expect(page.locator(".card").first()).toBeVisible();

  await page.locator("#categorias").selectOption("2");

  await expect(page.locator("#categorias option:checked")).toHaveText(
    "Graneleira",
  );

  // ==== Logout e Login -> Para aparecer Adicionar Modelo ====

  // Logout

  await rightSideBar.click();

  await rightSideBarAcess.toBeVisible();

  await page.locator(".leave-account").click();

  await expect(page).toHaveURL("/login");

  await emailInput.fill(SUPERUSER_EMAIL);

  await passwordInput.fill(TEST_PASSWORD);

  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page).toHaveURL("/");

  await page.goto("/modelos");

  await page.locator(".btn-model").click();

  // ====== Adicionar Modelo ======

  await expect(page).toHaveURL("/modelos/adicionar");

  await expect(page.locator(".title")).toBeVisible();

  // Imagem

  await expect(page.locator(".upload")).toBeVisible();

  await page
    .getByTestId("addModelImage-test")
    .setInputFiles("./src/assets/icons/foto-teste.png");

  await expect(page.getByText("Upload realizado com sucesso")).toBeVisible();

  // Nome

  const nome = page.getByPlaceholder("Ex: Carroceria de Madeira...");

  await nome.fill("Carroceria Teste E2E");

  // Categoria
  const categoria = page.locator("select");

  await categoria.selectOption({ label: "Graneleira" });

  // Descrição curta
  const descricaoCurta = page.getByPlaceholder("Máximo 100 caracteres");

  await descricaoCurta.fill("Carroceria criada pelo teste E2E");

  // Descrição
  const descricao = page.getByPlaceholder("Máximo 255 caracteres");

  await descricao.fill(
    "Esta carroceria foi criada automaticamente pelo teste E2E do Playwright.",
  );

  // Largura
  const largura = page.getByTestId("addModelLargura-test");

  await largura.fill("2.5");

  // Comprimento
  const comprimento = page.getByTestId("addModelComprimento-test");

  await comprimento.fill("6,0");

  // Altura
  const altura = page.getByTestId("addModelAltura-test");

  await altura.fill("2,8");

  // Preço
  const valor = page.getByPlaceholder("R$ Digite aqui o valor");

  await valor.fill("15000.00");

  // Envia o formulário
  await page.getByRole("button", { name: "Adicionar Modelo" }).click();

  await expect(
    page.getByText("Carroceria adicionada com sucesso."),
  ).toBeVisible();

  // Verifica se a carroceria foi adicionada

  await page.goto("/modelos");

  await expect(page.locator(".card").first()).toBeVisible();

  await expect(page.locator('div > h2').last()).toHaveText('Carroceria Teste E2E')

});
