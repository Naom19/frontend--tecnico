import { vi } from 'vitest';
import * as dataService from '../lib/supabaseService';
import { render, fireEvent } from '@testing-library/svelte'; 
import dataService.ts from '../src/api/dataService';
import add from '../src/routes/+page.svelte';
import App from '../src/routes/+page.svelte';
import { addTodo } from '../src/api/dataService';

vi.spyOn(dataService, 'addTodo').mockResolvedValue(Promise.resolve());
vi.spyOn(dataService, 'updateTodo').mockResolvedValue(Promise.resolve());

test('adds a new todo when add fx is called', async () => {
  const { getByLabelText, getByText } = render(App);  
  
  const input = getByLabelText('Add a new to do...'); // fill input
  await fireEvent.input(input, { target: { value: 'Add a new to do... item'} });

  const button = getByText('Add'); // click the add button
  await fireEvent.click(button);

  
});

/* describe('addTodo', () => {
  it('should correctly handle function calls', async () => {
    const { data, error } = render(+page.svelte);
    await fireEvent.click(getByTestId('my-button'));

    expect(dataService.addTodo).toBeCalledTimes(1);
    
  });
});

*/