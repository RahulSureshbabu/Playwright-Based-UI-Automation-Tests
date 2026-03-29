const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("the demo app is open", async function () {
  const title = this.page.locator("#title");
  await title.waitFor({ state: "visible" });
});

When("I click the generate greeting button", async function () {
  await this.page.getByRole("button", { name: "Generate greeting" }).click();
});

When("I enter the name {string}", async function (name) {
  await this.page.locator("#name-input").fill(name);
});

Then("I should see the heading {string}", async function (expectedHeading) {
  await expect(this.page.locator("#title")).toHaveText(expectedHeading);
});

Then("I should see greeting output {string}", async function (expectedGreeting) {
  await expect(this.page.locator("#greeting-output")).toHaveText(expectedGreeting);
});
