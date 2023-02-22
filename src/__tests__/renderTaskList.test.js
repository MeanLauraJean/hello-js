import { renderTaskList } from '../renderTaskList.js';

describe('renderTaskList', () => {
  it('should render something and not nothing', () => {
    let result = renderTaskList([]);
    expect(result).toBeTruthy();
  });
});
