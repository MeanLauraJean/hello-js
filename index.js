import { renderNewTaskForm } from './src/renderNewTaskForm.js';
import { renderTaskList } from './src/renderTaskList.js';

const taskList = [
  {
    id: 1,
    name: 'Make coffee',
    isDone: true,
  },
  {
    id: 2,
    name: 'Do Laundry',
    isDone: false,
  },
  {
    id: 3,
    name: 'Learn JavaScript',
    isDone: false,
  },
];

function renderApp() {
  document.body.innerHTML = '';

  let ul = renderTaskList(taskList, renderApp);
  document.body.append(ul);

  let form = renderNewTaskForm((newTask) => {
    taskList.push(newTask);
    renderApp();
  });
  document.body.append(form);
}

renderApp();
