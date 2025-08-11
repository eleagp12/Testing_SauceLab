const { After, AfterStep } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');

AfterStep(async function (step) {
  if (step.result.status === 'FAILED') {
    const screenshot = await this.driver.takeScreenshot();
    const screenshotDir = path.resolve('./screenshots');
    const filePath = path.resolve(
      `./screenshots/failed_step_${Date.now()}.png`,
    );

    console.log('Uploading screenshots directory...');
    fs.mkdirSync(screenshotDir, { recursive: true });
    fs.writeFileSync(filePath, screenshot, 'base64');
    console.log(`🖼 Screenshot saved to: ${filePath}`);
  }
});

After(async function () {
  if (this.driver) {
    await this.driver.quit();
  }
});
