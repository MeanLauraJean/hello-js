export function renderTaskList(taskList, renderApp) {
  let ul = document.createElement('ul');
  for (let task of taskList) {
    let li = document.createElement('li');
    let icon = task.isDone ? '✅' : '⌛️';
    li.append(`${icon} ${task.name}`);
    li.addEventListener('click', () => {
      task.isDone = !task.isDone;
      renderApp();
    });
    ul.append(li);
  }
  return ul;
}
