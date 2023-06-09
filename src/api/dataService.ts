import { supabase } from '../lib/supabaseService';
// create a fetchTodos function, that fetches all the todos from the database
import type { Todo } from '../routes/+page.svelte';

export async function addTodo(todo: Todo) {
    try {
        const { data, error } = await supabase.from('todolist').insert(todo);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error('There was an error fetching data (adding todo):', error);
        return null;
    }
}

export async function updateTodo(todo: Todo) {
    try {
        const { data, error } = await supabase.from('todolist').update(todo).match({ id: todo.id });
        if (error) {
            throw new Error(error.message);
        }
        return data; 
    }   catch (error) {
        console.error('Error updating todo: ', error);
        return null;
    }
}

export async function clearCompletedTodos() {
    try {
      const { data, error } = await supabase.from('todolist').delete().match({ status: true });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error('Error clearing completed todos:', error);
      return null;
    }
  }
  
export async function fetchTodos(): Promise<Todo[]> {
    try {
        const {data, error} = await supabase.from('todolist').select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as Todo[];
    } catch (error) {
        console.error('There was an error fetching data: ', error);
        return [];
    }
}