import { jest } from '@jest/globals';

import { renderNewTaskForm } from '../renderNewTaskForm.js';

describe('renderNewTaskForm', () => {
  it('should render correctly', () => {
    let addTask = jest.fn();
    let form = renderNewTaskForm(addTask);
    expect(addTask).toHaveBeenCalledTimes(0);
    expect(form).toBeTruthy();
    expect(form).toBeInstanceOf(HTMLFormElement);
    expect(form.childNodes.length).toEqual(2);
    expect(form.firstChild).toBeInstanceOf(HTMLInputElement);
    expect(form.lastChild).toBeInstanceOf(HTMLButtonElement);
  });
});
