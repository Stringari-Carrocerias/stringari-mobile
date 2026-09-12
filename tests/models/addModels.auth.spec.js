import { test, expect } from "@playwright/test";

import {
  addModelPath,
  getAddModelHtml,
  addModelImage,
  addModelName,
  addModelCategory,
  addModelShortDescription,
  addModelDescription,
  addModelWidth,
  addModelLength,
  addModelHeight,
  addModelValue,
} from "@/utils/tests/addModel";

test.describe("Adicionar Modelo", () => {
  // ========== VERIFY ==========

  test("(Verify) Verifica se a página de adicionar modelo está correta", async ({
    page,
  }) => {
    const {
      image,
      name,
      category,
      shortDescription,
      description,
      width,
      length,
      height,
      value,
      button,
    } = getAddModelHtml(page);

    await page.goto("/modelos/adicionar");

    await expect(page).toHaveURL("/modelos/adicionar");

    await expect(page.locator(".title")).toBeVisible();

    await expect(image).not.toBeVisible();

    await expect(name).toBeVisible();

    await expect(category).toBeVisible();

    await expect(shortDescription).toBeVisible();

    await expect(description).toBeVisible();

    await expect(width).toBeVisible();

    await expect(length).toBeVisible();

    await expect(height).toBeVisible();

    await expect(value).toBeVisible();

    await expect(button).toBeVisible();
  });

  // ========== SUCCESS ==========

  test("(Sucess) Adiciona um modelo", async ({ page }) => {
    const {
      image,
      name,
      category,
      shortDescription,
      description,
      width,
      length,
      height,
      value,
      button,
    } = getAddModelHtml(page);

    // Preenche os campos

    await addModelPath(page);

    await addModelImage(page, image);

    await addModelName(name);

    await addModelCategory(page, category, 0);

    await addModelShortDescription(shortDescription);

    await addModelDescription(description);

    await addModelWidth(width);

    await addModelLength(length);

    await addModelHeight(height);

    await addModelValue(value);

    // Clica no botão

    await button.click();

    await expect(
      page.getByText("Carroceria adicionada com sucesso."),
    ).toBeVisible();

    // Verifica se a carroceria foi adicionada

    await page.goto("/modelos");

    await expect(page.locator(".card").first()).toBeVisible();

    await expect(page.locator("div > h2").last()).toHaveText(
      "Carroceria Teste E2E",
    );
  });

  test("(Sucess) Adiciona uma categoria", async ({ page }) => {
    const { button, image, name, category } = getAddModelHtml(page);

    await addModelPath(page);

    await addModelImage(page, image);

    await addModelName(name);

    await addModelCategory(page, category, 0);

    await button.click();

    await expect(page.getByText("Descrição curta inválida.")).toBeVisible();

    await addModelCategory(page, category, 1);

    await button.click();

    await expect(page.getByText("Descrição curta inválida.")).toBeVisible();

    await expect(page.locator(".select-category").last()).toHaveValue(
      "CategoriaTESTE",
    );
  });

  // ========== ERROR ==========

  test("(Error) Insira uma imagem", async ({ page }) => {
    const { button } = getAddModelHtml(page);

    await page.goto("/modelos/adicionar");

    await button.click();

    await expect(page.getByText("Insira uma imagem")).toBeVisible();
  });

  test("(Error) Insira um nome", async ({ page }) => {
    const { image, button } = getAddModelHtml(page);

    await addModelPath(page);

    await addModelImage(page, image);

    await button.click();

    await expect(page.getByText("Nome inválido")).toBeVisible();
  });

  test("(Error) Insira uma categoria", async ({ page }) => {
    const { image, name, button } = getAddModelHtml(page);

    await addModelPath(page);

    await addModelImage(page, image);

    await addModelName(name);

    await button.click();

    await expect(page.getByText("Categoria inválida.")).toBeVisible();
  });

  test("(Error) Insira uma descrição curta", async ({ page }) => {
    const { image, name, category, button } = getAddModelHtml(page);

    await addModelPath(page);

    await addModelImage(page, image);

    await addModelName(name);

    await addModelCategory(page, category, 0);

    await button.click();

    await expect(page.getByText("Descrição curta inválida.")).toBeVisible();
  });

  test("(Error) Insira uma descrição", async ({ page }) => {
    const { image, name, category, shortDescription, button } =
      getAddModelHtml(page);

    await addModelPath(page);

    await addModelImage(page, image);

    await addModelName(name);

    await addModelCategory(page, category, 0);

    await addModelShortDescription(shortDescription);

    await button.click();

    await expect(page.getByText("Descrição inválida.")).toBeVisible();
  });

  test("(Error) Insira uma largura", async ({ page }) => {
    const { image, name, category, shortDescription, description, button } =
      getAddModelHtml(page);

    await addModelPath(page);

    await addModelImage(page, image);

    await addModelName(name);

    await addModelCategory(page, category, 0);

    await addModelShortDescription(shortDescription);

    await addModelDescription(description);

    await button.click();

    await expect(page.getByText("Largura inválida.")).toBeVisible();
  });

  test("(Error) Insira um comprimento", async ({ page }) => {
    const {
      image,
      name,
      category,
      shortDescription,
      description,
      width,
      button,
    } = getAddModelHtml(page);

    await addModelPath(page);

    await addModelImage(page, image);

    await addModelName(name);

    await addModelCategory(page, category, 0);

    await addModelShortDescription(shortDescription);

    await addModelDescription(description);

    await addModelWidth(width);

    await button.click();

    await expect(page.getByText("Comprimento inválido.")).toBeVisible();
  });

  test("(Error) Insira uma altura", async ({ page }) => {
    const {
      image,
      name,
      category,
      shortDescription,
      description,
      width,
      length,
      button,
    } = getAddModelHtml(page);

    await addModelPath(page);

    await addModelImage(page, image);

    await addModelName(name);

    await addModelCategory(page, category, 0);

    await addModelShortDescription(shortDescription);

    await addModelDescription(description);

    await addModelWidth(width);

    await addModelLength(length);

    await button.click();

    await expect(page.getByText("Altura inválida.")).toBeVisible();
  });

  test("(Error) Insira um valor", async ({ page }) => {
    const {
      image,
      name,
      category,
      shortDescription,
      description,
      width,
      length,
      height,
      button,
    } = getAddModelHtml(page);

    await addModelPath(page);

    await addModelImage(page, image);

    await addModelName(name);

    await addModelCategory(page, category, 0);

    await addModelShortDescription(shortDescription);

    await addModelDescription(description);

    await addModelWidth(width);

    await addModelLength(length);

    await addModelHeight(height);

    await button.click();

    await expect(page.getByText("Preço inválido.")).toBeVisible();
  });
});
