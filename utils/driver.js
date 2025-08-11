import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

const options = new chrome.Options();

export default function createDriver() {
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
