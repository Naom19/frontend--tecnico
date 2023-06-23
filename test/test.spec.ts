import { add } from '../path/to/todoFunctions.ts';
import * as dataService from '../path/to/dataService.ts';
import { vi } from 'vitest';

describe('todoFunctions', () => {
    it('should create a new Todo and add it', async () => {
        const addTodoMock = vi.spyOn(dataService, 'addTodo').mockResolvedValue(Promise.resolve());

        await add('new task');

        expect(addTodoMock).toHaveBeenCalled();

        // Clear mock after test
        addTodoMock.mockRestore();
    });
});
