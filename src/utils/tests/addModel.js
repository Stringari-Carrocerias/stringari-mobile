import { expect } from "@playwright/test";

export function getAddModelHtml(page) {
  return {
    image: page.getByTestId("addModelImage-test"),
    name: page.getByPlaceholder("Ex: Carroceria de Madeira..."),
    category: page.locator("select"),
    shortDescription: page.getByPlaceholder("Máximo 100 caracteres"),
    description: page.getByPlaceholder("Máximo 255 caracteres"),
    width: page.getByTestId("addModelLargura-test"),
    length: page.getByTestId("addModelComprimento-test"),
    height: page.getByTestId("addModelAltura-test"),
    value: page.getByPlaceholder("R$ Digite aqui o valor"),
    button: page.getByRole("button", { name: "Adicionar Modelo" }),
  };
}

export async function addModelPath(page) {
  await page.goto("/modelos/adicionar");
}

export async function addModelImage(page, image) {
  await expect(image).not.toBeVisible();

  await image.setInputFiles("./src/assets/icons/foto-teste.png");

  await expect(page.getByText("Upload realizado com sucesso")).toBeVisible();
}

export async function addModelName(name) {
  await name.fill("Carroceria Teste E2E");

  await expect(name).toHaveValue("Carroceria Teste E2E");
}

export async function addModelCategory(page, category, select) {
  if (select === 0) {
    await category.selectOption({ label: "Graneleira" });
    await expect(category).toHaveValue("Graneleira");
    return;
  }
  await category.selectOption({ label: "Outros" });
  await page.getByTestId("addModelCategory-test").fill("CategoriaTESTE");
  await expect(page.getByTestId("addModelCategory-test")).toHaveValue(
    "CategoriaTESTE",
  );
}

export async function addModelShortDescription(shortDescription) {
    await shortDescription.fill("Descrição curta teste E2E");
    await expect(shortDescription).toHaveValue("Descrição curta teste E2E");
}

export async function addModelDescription(description) {
  await description.fill("Descrição teste E2E");
  await expect(description).toHaveValue("Descrição teste E2E");
}

export async function addModelWidth(width) {
  await width.fill("2");
  await expect(width).toHaveValue("2");
}

export async function addModelLength(length) {
  await length.fill("3");
  await expect(length).toHaveValue("3");
}

export async function addModelHeight(height) {
  await height.fill("4");
  await expect(height).toHaveValue("4");
}

export async function addModelValue(value) {
  await value.fill("10000");
  await expect(value).toHaveValue("10000");
}