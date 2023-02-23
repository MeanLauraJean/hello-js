// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle('Hello World');
});

// TODO: Your task is to write another test here.
// I'm happy if you just get any test running and passing.
// My suggestion is to reference tests-examples/demo-todo-app.spec.js and see
// how they did their tests.
// One simple test might be to assert that there are three task items initially.
// You must have your dev server running in a Terminal window/tab in order to
// run your tests. To run the dev server enter: npm start
// Remember to run just the playwright tests you can do one of the following:
// - In your terminal, enter: npm run e2e
// - In your terminal, enter: npx playwright test


test('has task items', async ({ page }) => {
    await page.goto('http://localhost:3000/');
  
    const listItems = page.getByRole('listitem');
  
    await expect(listItems).toHaveText([
      '✅ Make coffee',
      '⌛️ Do Laundry',
      '⌛️ Learn JavaScript',
    ]);
});
  
// The initial list has 3 tasks
test('The initial list has 3 tasks', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('listitem')).toHaveCount(3);
});

test('Add an item to the list', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const textInput = page.getByPlaceholder('Enter a task');
    await textInput.fill('Buy socks');
    const button = page.getByRole('button', { name: 'Add Task' });
    await button.click();
    const listItems = page.getByRole('listitem').filter({ hasText: 'Buy socks' });
    await expect(listItems).toHaveCount(1);
});

test('Mark incomplete tasks as done', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const incompleteListItems = page.locator('⌛️');
  const incompleteCount = await incompleteListItems.count();
  if (incompleteCount > 0) {
    await incompleteListItems.click();
  }
  for (let i=0; i< incompleteCount; i++) {
    await expect(incompleteListItems.nth(i)).toHaveText('✅')
  }
});
