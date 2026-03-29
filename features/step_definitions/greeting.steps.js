const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("node:assert/strict");

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
  const headingText = await this.page.locator("#title").innerText();
  assert.equal(headingText.trim(), expectedHeading);
});

Then("I should see greeting output {string}", async function (expectedGreeting) {
  const outputText = await this.page.locator("#greeting-output").innerText();
  assert.equal(outputText.trim(), expectedGreeting);
});
