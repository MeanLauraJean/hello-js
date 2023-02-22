export function renderNewTaskForm(addTask) {
  let form = document.createElement('form');
  let input = document.createElement('input');
  input.placeholder = 'Enter a task';
  form.append(input);
  let button = document.createElement('button');
  button.append('Add Task');
  form.append(button);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask({
      id: Date.now(),
      name: input.value,
      isDone: false,
    });
  });
  return form;
}
