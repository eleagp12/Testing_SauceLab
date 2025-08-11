const { By, until } = require('selenium-webdriver');

module.exports = {
  async getUsernameInput(driver) {
    await driver.wait(until.elementLocated(By.name('user-name')), 50000);
    return driver.findElement(By.name('user-name'));
  },

  async getPasswordInput(driver) {
    await driver.wait(until.elementLocated(By.name('password')), 50000);
    return driver.findElement(By.name('password'));
  },

  async getLoginButton(driver) {
    await driver.wait(until.elementLocated(By.name('login-button')), 50000);
    return driver.findElement(By.name('login-button'));
  },
  async enterCredentials(driver, username, password) {
    const userField = await this.getUsernameInput(driver);
    await userField.sendKeys(username);

    const passField = await this.getPasswordInput(driver);
    await passField.sendKeys(password);

    const button = await this.getLoginButton(driver);
    await button.click();
  },
};
