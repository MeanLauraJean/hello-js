// @ts-check
import { test, expect } from '@playwright/test';

// Task 60
test('Task 60a - Home feed loads', async ({ page }) => {
  await page.goto('https://90u6ms-3000.preview.csb.app/');

  const headerTitle = page.getByText('Home', { exact: true });

  await expect(headerTitle).toBeVisible();
});

test('Task 60b - Clicking create post (plus button) will navigate to login', async ({
  page,
}) => {
  await page.goto('https://90u6ms-3000.preview.csb.app/');

  const createPostButton = page
    .getByRole('button')
    .filter({ has: page.locator('.icon-tabler-plus') });

  await expect(createPostButton).toHaveCount(1);

  await createPostButton.click();

  await expect(page).toHaveURL('https://90u6ms-3000.preview.csb.app/login');

  const welcomeHeader = page.getByText('Welcome to Chirper');
  await expect(welcomeHeader).toBeVisible();
});

  // Task 61
    // TODO:
    // - Fill the login form fields
    // - Submit the login
    // - Assert that we have been navigated back to the home screen
test('Task 61 - Test logging in', async ({ page }) => {
    await page.goto('https://90u6ms-3000.preview.csb.app/login');
      
    // Verify login page content has loaded
    const welcomeHeader = page.getByText('Welcome to Chirper');
    await expect(welcomeHeader).toBeVisible();

    // Fill in username and password fields, then press Enter
    const uname = page.getByPlaceholder('Enter your username');
    await uname.fill('oliviagreene');
    const pw = page.getByPlaceholder('Enter your password');
    await pw.fill('asdf');
    await pw.press('Enter');

    // Verify the URL of the home screen and content on the homescreen
    await expect(page).toHaveURL('https://90u6ms-3000.preview.csb.app/');
    const headerTitle = page.getByText('Home', { exact: true });
    await expect(headerTitle).toBeVisible();
});