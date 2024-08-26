import { test, expect } from '@playwright/test';
import { getTestInputData, writeResultsOutput } from '../scrapmancer/test-helpers';

test('login-example', async ({ page }) => {
  const inputData = getTestInputData();
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill(inputData?.userName ?? '');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(inputData?.password ?? '');
  await page.getByRole('button', { name: 'Submit' }).click();
  const loggedInText =  await page.locator(".post-title").innerText();
  writeResultsOutput({
    loggedInText,
    userName: inputData?.userName
  })
});