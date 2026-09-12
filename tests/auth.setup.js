import { test as setup } from '@playwright/test' 

const authFile = 'playwright/.auth/user.json'

setup("Autenticação", async ({page}) => {
    await page.goto("/login");

    await page.getByPlaceholder("seu@email.com").fill(process.env.SUPERUSER_EMAIL);

    await page.getByPlaceholder("Digite sua senha").fill(process.env.TEST_PASSWORD);

    await page.getByRole("button", { name: "Entrar" }).click();

    await page.waitForURL("/");

    await page.context().storageState({ path: authFile })
})