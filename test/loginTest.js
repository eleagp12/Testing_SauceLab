require('dotenv').config();

const {Builder, By, until} = require('selenium-webdriver');
const{expect} = require('chai');

describe('OrangeHRM Login Test', function(){
    let driver;
    this.timeout(30000);

    before(async () =>{
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('Should login and logout succesfuly', async () => {
        await driver.get(process.env.BASE_URL);

        // Login
        console.log("Entering username...");
        await driver.wait(until.elementLocated(By.name('username')), 10000);
        await driver.findElement(By.name('username')).sendKeys(process.env.LOGIN_USERNAME);
        
        console.log("Entering password...");
        await driver.wait(until.elementLocated(By.name('password')), 10000);
        await driver.findElement(By.name('password')).sendKeys(process.env.LOGIN_PASSWORD);

        console.log("Entering login...");
        await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 10000);
        await driver.findElement(By.css('button[type="submit"]')).click();
        
        // Wait for dashboard
        await driver.wait(until.elementLocated(By.css('h6.oxd-text--h6')), 10000);
        const heading = await driver.findElement(By.css('h6.oxd-text--h6')).getText();
        expect(heading).to.include('Dashboard');
        
        // Logout
        await driver.findElement(By.css('.oxd-userdropdown-icon')).click();
        await driver.findElement(By.xpath("//a[text()='Logout']")).click();

        // Verifiy return to login page 
        await driver.wait(until.elementLocated(By.name('username')), 10000); 
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('/auth/login');

         await driver.quit();
    });
})
