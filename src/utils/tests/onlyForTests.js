export function generateRandomEmail() {
  const randomValue = Math.random().toString(36).substring(2, 10);
  return `${randomValue}teste@teste.com`;
}

export function getPersonalHtml(page) {
  return {
    image: page.getByTestId("personalTest-image"),
    button: page.getByRole("button", { name: "Salvar alterações" }),
    email: page.getByTestId("personalTest-email"),
    emailInput: page.getByTestId("personalTest-email").locator("input"),
    name: page.getByTestId("personalTest-name"),
    nameInput: page.getByTestId("personalTest-name").locator("input"),
    phone: page.getByTestId("personalTest-phone").locator("input"),
    phoneInput: page.getByTestId("personalTest-phone").locator("input"),
  };
}