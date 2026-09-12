# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user/personalInfo.auth.spec.js >> Informações Pessoais >> (Verify) Verifica todos os campos
- Location: tests/user/personalInfo.auth.spec.js:7:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Adicionar')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Adicionar') with timeout 5000ms
  - waiting for getByText('Adicionar')

```

```yaml
- img
- heading "Informações Pessoais" [level=1]
- img "Prévia da imagem"
- paragraph:
  - img
- paragraph: Editar
- paragraph: Superusuário
- paragraph: Email
- textbox: a@a.com
- paragraph: Nome Completo
- textbox "Toque para adicionar"
- paragraph: Telefone
- textbox "Toque para adicionar"
- button "Salvar alterações"
- img
- img
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { generateRandomEmail, getPersonalHtml } from "@/utils/tests/onlyForTests";
  3   | 
  4   | test.describe("Informações Pessoais", () => {
  5   |   // ========== VERIFY ==========
  6   | 
  7   |   test("(Verify) Verifica todos os campos", async ({ page }) => {
  8   |     const { image, button } = getPersonalHtml(page);
  9   |     await page.goto("/informacoes-pessoais");
  10  | 
  11  |     await expect(page).toHaveURL("/informacoes-pessoais");
  12  | 
  13  |     await expect(
  14  |       page.getByRole("heading", { name: "Informações Pessoais" }),
  15  |     ).toBeVisible();
  16  | 
  17  |     await expect(page.getByTestId("personalTest-email")).not.toHaveText(
  18  |       "Toque para adicionar",
  19  |     );
  20  | 
  21  |     await expect(image).not.toBeVisible();
  22  | 
> 23  |     await expect(page.getByText("Adicionar")).toBeVisible();
      |                                               ^ Error: expect(locator).toBeVisible() failed
  24  | 
  25  |     await expect(button).toBeVisible();
  26  |   });
  27  | 
  28  |   // ========== SUCCESS ==========
  29  | 
  30  |   test("(Success) Botão 'Salvar Alterações' funciona mesmo sem alterar nada", async ({
  31  |     page,
  32  |   }) => {
  33  |     const { button } = getPersonalHtml(page);
  34  | 
  35  |     await page.goto("/informacoes-pessoais");
  36  | 
  37  |     await button.click();
  38  | 
  39  |     await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
  40  |   });
  41  | 
  42  |   test("(Success) Altera imagem", async ({ page }) => {
  43  |     const { image, button } = getPersonalHtml(page);
  44  | 
  45  |     await page.goto("/informacoes-pessoais");
  46  | 
  47  |     await image.setInputFiles("./src/assets/icons/foto-teste.png");
  48  |     
  49  |     await expect(page.getByText("Editar")).toBeVisible();
  50  | 
  51  |     await button.click();
  52  | 
  53  |     await expect(page.getByText("Upload realizado com sucesso.")).toBeVisible();
  54  |     
  55  |     expect(await image).toBeTruthy();
  56  | 
  57  |     await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
  58  |     
  59  |     await page.reload();
  60  |     
  61  |     await expect(page.getByText("Editar")).toBeVisible();
  62  |     
  63  |   });
  64  | 
  65  |   test("(Success) Altera e-mail", async ({ page }) => {
  66  |     const { button, email, emailInput } =
  67  |       getPersonalHtml(page);
  68  | 
  69  |     await page.goto("/informacoes-pessoais");
  70  | 
  71  |     await expect(email).toBeVisible();
  72  | 
  73  |     const emailBefore = await emailInput.inputValue();
  74  | 
  75  |     await emailInput.fill(generateRandomEmail());
  76  | 
  77  |     await button.click();
  78  | 
  79  |     await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
  80  | 
  81  |     expect(await emailInput.inputValue()).not.toBe(emailBefore);
  82  | 
  83  |     await emailInput.fill(emailBefore);
  84  | 
  85  |     await button.click();
  86  | 
  87  |     await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
  88  |   });
  89  | 
  90  |   test("(Success) Altera nome completo", async ({ page }) => {
  91  |     const { button, name, nameInput } = getPersonalHtml(page);
  92  | 
  93  |     await page.goto("/informacoes-pessoais");
  94  | 
  95  |     await expect(name).toBeVisible();
  96  | 
  97  |     await nameInput.fill("Nome Teste");
  98  | 
  99  |     await button.click();
  100 | 
  101 |     await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
  102 | 
  103 |     expect(await nameInput.inputValue()).toBe("Nome Teste");
  104 | 
  105 |     await nameInput.fill("");
  106 | 
  107 |     await button.click();
  108 | 
  109 |     await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
  110 |   });
  111 | 
  112 |   test("(Success) Altera telefone", async ({ page }) => {
  113 |     const { button, phone, phoneInput } = getPersonalHtml(page);
  114 | 
  115 |     await page.goto("/informacoes-pessoais");
  116 | 
  117 |     await expect(phone).toBeVisible();
  118 | 
  119 |     await phoneInput.fill("(12) 93456-7890");
  120 | 
  121 |     await button.click();
  122 | 
  123 |     await expect(page.getByText("Alteração salva com sucesso.")).toBeVisible();
```