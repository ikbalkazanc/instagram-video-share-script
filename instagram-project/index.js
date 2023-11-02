import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import util from './utils.js'
import config from './config.js'
import { addHistory, initDb } from "./db.js";

let driver = new Builder().forBrowser("chrome").build();
await initDb();


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    var mail = "tariq.mata@outlook.com";
    var name = "halle.bass.daily.homeless";
    var pass = "tariq.mata";

    await driver.get("https://www.instagram.com/");

    let condition = until.elementLocated(By.name('username'));
    await driver.wait(condition, 2000);
    var username = await driver.findElement(By.name("username"))
    await username.sendKeys(name, Key.RETURN);

    var password = await driver.findElement(By.name("password"))
    await password.sendKeys(pass, Key.RETURN);

    await util.clickTextIfExist(driver, "Not Now");

    await util.clickTextIfExist(driver, "Not Now");

    await driver.wait(condition, 9000);

    await util.clickAriaLabel(driver, 'New post')

    await util.uploadFile(driver, '/Users/ikbal.kazanci/Downloads/poh.mp4');

    await util.clickTextIfExist(driver, "OK");

    await util.clickAriaLabel(driver, "Select crop");

    await util.clickTextIfExist(driver, "Original");

    await util.clickTextIfExist(driver, "Original");

    await util.clickTextIfExist(driver, "Next");
    await util.clickTextIfExist(driver, "Next");

    condition = until.elementLocated(By.css("[aria-label='Write a caption...']"));
    await driver.wait(condition, 9000);
    let writeInput = await driver.findElement(By.css("[aria-label='Write a caption...']"));
    writeInput.click();
    await writeInput.sendKeys("Description", Key.RETURN);

    await util.clickTextIfExist(driver, "Share");

    condition = until.elementLocated(By.css("[aria-label='Your reel has been shared.']"));
    await driver.wait(condition, 60000);

    await util.clickAriaLabel(driver, "Close");


    driver.get("https://instagram.com/accounts/logout")

    let usernameLogoutElem = until.elementLocated(By.name('username'));
    await driver.wait(usernameLogoutElem, 10000);

    addHistory(username);

    await sleep(5000)
}


main().then(driver.quit).catch(driver.quit)


