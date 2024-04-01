const { Builder, Browser, By, until, key } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  // New test 1: Check that clicking the Draw button displays the div with id = “choices”
  test("clicking Draw button displays choices", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.elementLocated(By.id("draw")), 5000); // wait up to 5000ms
    await driver.findElement(By.id("draw")).click();
    const choicesDiv = await driver.findElement(By.id("choices"));
    expect(await choicesDiv.isDisplayed()).toBe(true);
  });

  // New test 2: Check that clicking an “Add to Duo” button displays the div with id = “player-duo”
  test("clicking Add to Duo button displays player-duo", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.elementLocated(By.id("draw")), 5000);
    await driver.findElement(By.id("draw")).click();
    await driver.wait(
      until.elementIsVisible(driver.findElement(By.id("player-duo"))),
      5000
    );
    const playerDuoDiv = await driver.findElement(By.id("player-duo"));
    expect(await playerDuoDiv.isDisplayed()).toBe(true);
  });
});
