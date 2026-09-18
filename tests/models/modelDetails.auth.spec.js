import { test, expect } from "@playwright/test";

test.describe('Modelos Detalhes', () => {
    test('(Verify) Verifica detalhes', async ({page}) => {
        await page.goto('/modelos/detalhes/1');

        await expect(page.locator('.image')).toBeVisible();

        await expect(page.getByTestId('test-closeicon')).toBeVisible();

        await expect(page.locator('.title-container').getByRole('heading', {})).toBeVisible();
        await expect(page.locator('.sides-container li').first()).toBeVisible();
        await expect(page.locator('.description p')).toBeVisible();
        await expect(page.locator('.acessorie-container li').first()).toBeVisible();
        await expect(page.locator('.info-extra')).toBeVisible();

        await expect(page.locator('.actions-container')).toBeVisible();

        await expect(page.locator('.actions-container')).toBeVisible();
        await expect(page.locator('.price')).toBeVisible();
        await expect(page.locator('.budget-btn')).toBeVisible();

    })

    test('(Verify) Verifica funcionamento dos botões', async ({page}) => {
        
        await page.goto('/modelos/detalhes/1');

        await page.locator('.budget-btn').click();

        await expect(page).toHaveURL('/orcamento');

        await page.goto('/modelos/detalhes/1');

        await expect(page.locator('.info-extra')).toBeVisible();        

        await page.locator('.info-extra span').click();

        await expect(page).toHaveURL('/orcamento');
    })
})