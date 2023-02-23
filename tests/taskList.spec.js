// @ts-check
import { test, expect } from '@playwright/test';


//Task 56 - First Playwright tests
  //TODO: Your task is to write another test here.
  // I'm happy if you just get any test running and passing.
  // My suggestion is to reference tests-examples/demo-todo-app.spec.js and see
  // how they did their tests.
  // One simple test might be to assert that there are three task items initially.
  // You must have your dev server running in a Terminal window/tab in order to
  // run your tests. To run the dev server enter: npm start
  // Remember to run just the playwright tests you can do one of the following:
  // - In your terminal, enter: npm run e2e
  // - In your terminal, enter: npx playwright test
test('Task 56 - Page has a title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle('Hello World');
});

//Task 56 - First Playwright tests (continued)
test('Task 56 - The task list has specific task items', async ({ page }) => {
    await page.goto('http://localhost:3000/');
  
    const listItems = page.getByRole('listitem');
  
    await expect(listItems).toHaveText([
      '✅ Make coffee',
      '⌛️ Do Laundry',
      '⌛️ Learn JavaScript',
    ]);
});
  
// Task 57 - The initial list has 3 tasks
test('The initial task list has 3 tasks', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('listitem')).toHaveCount(3);
});


// Task 57 - Add a new task to the list
  // TODO: Write an assertion that the task list now contains our new task
test('Task 57 - Add a new task to the list', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const textInput = page.getByPlaceholder('Enter a task');
    await textInput.fill('Buy socks');
    const button = page.getByRole('button', { name: 'Add Task' });
    await button.click();
    const listItems = page.getByRole('listitem').filter({ hasText: 'Buy socks' });
    await expect(listItems).toHaveCount(1);
});

// Task 58 - Mark a specific incomplete task as Done
  // 1. Setup the test (go to the page); Remember you local dev server needs to be running.
  // 2. Locate a thing on the page
  // 3. Do an action, e.g. click the thing
  // 4. Make an assertion; use expect() to assert that something is a certain way on the page
test('Task 58 - Mark a specific incomplete task as Done', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const listItems = page
    .getByRole('listitem')
    .filter({ hasText: 'Learn JavaScript' });

  await listItems.click();

  await expect(listItems).toHaveText('✅ Learn JavaScript');
});

// Task 58 alternate solution - Mark all incomplete tasks as Done
test('Task 58 - Mark ALL incompletes tasks as Done (alternate solution)', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const listItems = page.getByRole('listitem');

  const beforeList = [];

  for (const li of await listItems.all()) {
    const text = await li.innerText();
    beforeList.push(text);
  }

  expect(beforeList).toEqual([
    '✅ Make coffee',
    '⌛️ Do Laundry',
    '⌛️ Learn JavaScript',
  ]);

  const incompleteItems = page.getByText('⌛️');
  while ((await incompleteItems.count()) > 0) {
    await incompleteItems.first().click();
  }

  await expect(page.getByText('✅')).toHaveCount(beforeList.length);
});

//Task 59 - Add an item, mark it as Done, then mark it as incomplete
// Assert the initial state
  // Then create a new task
  // Assert new task has been created in the "not done" state
  // Assert the text input is now empty (it gets cleared after submit)
  // Click to mark the task as done; assert that worked
  // Click again to mark the task as not done; assert that worked
  // Don't forget to setup your test (go to the correct page)
  // To run your tests, use: npm run e2e
test('Task 59 - Add an item, mark it as Done, then mark it as incomplete', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Assert the initial state
  const listItems = page.getByRole('listitem');
    await expect(listItems).toHaveText([
      '✅ Make coffee',
      '⌛️ Do Laundry',
      '⌛️ Learn JavaScript',
    ]);

  // Create a new task
  const textInput = page.getByPlaceholder('Enter a task');
  await textInput.fill('Eat Breakfast');
  await textInput.press('Enter');
  await expect(listItems).toHaveCount(4);

  // Assert the new task is in the incomplete state
  const newItem = page.getByText('Eat Breakfast');
  await expect(newItem).toContainText('⌛️');

  // Assert text input is empty
  await expect(textInput).toHaveValue('');

  // Mark as Done 
  await newItem.click();
  await expect(newItem).toHaveText('✅ Eat Breakfast'); // Could also do: await expect(newItem).toContainText('✅');

  // Mark as incomplete 
  await newItem.click();
  await expect(newItem).toHaveText('⌛️ Eat Breakfast'); // Could also do:   await expect(newItem).toContainText('⌛️');

});
