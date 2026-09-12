import { test, expect } from "@playwright/test";

test("(Verify) Verifica se as sidebars estão funcionando)", async ({
  page,
}) => {
  const leftSideBar = page.getByAltText("hamburger-button");
  const leftSideBarAcess = expect(page.locator(".left-handle-acess"));

  const rightSideBar = page.getByTestId("sidebar-right");
  const rightSideBarAcess = expect(page.locator(".right-handle-acess"));

  const clicarFora = page.getByTestId("Início");

  await page.goto("/");

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

  await clicarFora.click();

  await rightSideBarAcess.not.toBeVisible();
});
