import dotenv from 'dotenv';
dotenv.config();

import { Given, When, Then } from '@cucumber/cucumber';
import { By, until } from 'selenium-webdriver';
import createDriver from '../../utils/driver.js';
import loginPage from '../../pageObjects/loginPage.js';
import { expect } from 'chai';

import {
  addProductToCart,
  openCart,
  isProductInCart,
} from '../../pageObjects/cartPage.js';

console.log('createDriver loaded:', typeof createDriver);

Given('I am on the login page', async function () {
  await this.driver.get(process.env.BASE_URL);
});

When('I enter valid credentials', async function () {
  console.log('Login user...');
  await loginPage.enterCredentials(
    this.driver,
    process.env.LOGIN_USERNAME,
    process.env.LOGIN_PASSWORD,
  );
});

Then('I check for any emergency windows', async function () {
  console.log('Checking for any emergency windows');
  const errorButtons = await this.driver.findElements(
    By.className('error-button'),
  );
  if (errorButtons.length > 0) {
    console.log('Emergency window detected. Closing...');
    await errorButtons[0].click();
  }
});

Then('I add a product to the cart', async function () {
  console.log('Looking for a product...');
  await addProductToCart(this.driver);
});

Then('I verify the cart contains the product', async function () {
  console.log('Navigation to cart...');
  await openCart(this.driver);
  const isInCart = await isProductInCart(this.driver);
  expect(isInCart).to.be.true;
});

Given('I am in the login page', async function () {
  await this.driver.get(process.env.BASE_URL);
});

When('I enter invalid credentials', async function () {
  await loginPage.enterCredentials(
    this.driver,
    'invalid-user',
    'invalid-password',
  );
});

Then('I should see an error message', async function () {
  const errorElements = await this.driver.wait(
    until.elementsLocated(By.css('[data-test="error"]')),
    50000,
  );

  const errorText = await errorElements[0].getText();
  console.log('Error message text', errorText);
  expect(errorText).to.include('Username and password do not match any user');
});
