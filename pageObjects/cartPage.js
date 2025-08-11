import { By } from 'selenium-webdriver';

export async function addProductToCart(driver) {
  const product = await driver.findElement(
    By.xpath("//div[text()='Sauce Labs Backpack']"),
  );
  const parent = await product.findElement(
    By.xpath('./ancestor::div[@class="inventory_item"]'),
  );
  const addCartButton = await parent.findElement(
    By.css('button.btn_inventory'),
  );
  await addCartButton.click();
}

export async function openCart(driver) {
  await driver.findElement(By.className('shopping_cart_link')).click();
}

export async function isProductInCart(
  driver,
  expectedName = 'Sauce Labs Backpack',
) {
  const item = await driver.findElement(
    By.xpath(`//div[text()='${expectedName}']`),
  );
  const text = await item.getText();
  return text.trim() === expectedName;
}
