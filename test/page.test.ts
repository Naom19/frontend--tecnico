import { describe, it, expect, vi } from 'vitest';
import * as dataService from '../api/dataService';
import { render, fireEvent } from '@testing-library/svelte';
import TodoPage from '../+page.svelte';

describe('TodoPage', () => {
  it('should call addTodo when add is triggered', async () => {
    const mockTodo = { id: 'uuid', title: 'title', status: false };
    const addTodoSpy = vi.spyOn(dataService, 'addTodo').mockResolvedValue(mockTodo);
    
    const { getByText, getByPlaceholderText } = render(TodoPage);
    const addTodoInput = getByPlaceholderText('Add a new to do...');
    const addTodoButton = getByText('Add');
    
    addTodoInput.value = 'title';
    await fireEvent.click(addTodoButton);

    expect(addTodoSpy).toBeCalledTimes(1);
    expect(addTodoSpy).toBeCalledWith(mockTodo);
    addTodoSpy.mockRestore();
  });
});
