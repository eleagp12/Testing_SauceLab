const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();

function createDriver() {
  if (process.env.HEADLESS === 'true') {
    options.addArguments('--headless', '--disable-gpu');
  }
  options.addArguments(
    '--disable-features=AutofillServerCommunication',
    '--disable-save-password-bubble',
    '--disable-notifications',
  );
  options.setUserPreferences({
    credentials_enable_service: false,
    'profile.password_manager_enabled': false,
  });

  return new Builder().forBrowser('chrome').setChromeOptions(options).build();
}

module.exports = createDriver;
