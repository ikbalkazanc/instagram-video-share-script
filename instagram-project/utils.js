import { By, until } from "selenium-webdriver";

async function uploadFile(driver, file) {
    var condition = until.elementLocated(By.css('input[type="file"]'));
    await driver.wait(condition, 9000);
    let fileInput = await driver.findElement(By.css('input[type="file"]'));
    await fileInput.sendKeys(file);
}

async function clickAriaLabel(driver, label) {
    var condition = until.elementLocated(By.css(`[aria-label='${label}']`));
    await driver.wait(condition, 9000);
    let shareSize = await driver.findElement(By.css(`[aria-label='${label}']`));
    shareSize.click();
}

async function clickTextIfExist(driver, text) {
    var condition = until.elementLocated(By.xpath(`//*[text()='${text}']`));
    await driver.wait(condition, 9000);
    let okElem = await driver.findElement(By.xpath(`//*[text()='${text}']`));
    if (okElem) {
        okElem.click();
    }
}

export default {
    uploadFile,
    clickAriaLabel,
    clickTextIfExist
}