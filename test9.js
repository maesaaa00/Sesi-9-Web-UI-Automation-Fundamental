const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const edge = require('selenium-webdriver/edge');

describe('SauceDemo Test', function () {
    let driver;

   it('Sukses Login + Sort Produk Z-A', async function () {

        let options = new edge.Options();
        options.addArguments("--headless");

        driver = await new Builder()
            .forBrowser('MicrosoftEdge')
            .setEdgeOptions(options)
            .build();

        await driver.get('https://www.saucedemo.com');

        // login
        await driver.findElement(By.css('[data-test="username"]')).sendKeys('standard_user');
        await driver.findElement(By.xpath('//*[@data-test="password"]')).sendKeys('secret_sauce');
        await driver.findElement(By.css('#login-button')).click();

        // assert login
        let logo = await driver.findElement(By.className('app_logo'));
        let textLogo = await logo.getText();
        assert.strictEqual(textLogo, 'Swag Labs');

        // tunggu cart
        let cart = await driver.wait(
            until.elementLocated(By.css('[data-test="shopping-cart-link"]')),
            5000
        );

        await driver.wait(until.elementIsVisible(cart), 5000);

        // sort Z-A
        let sortDropdown = await driver.findElement(By.css('[data-test="product-sort-container"]'));
        await sortDropdown.sendKeys('Name (Z to A)');

        await driver.sleep(2000);

        await driver.quit();
    });
});