import { supabase } from '../lib/supabaseService';
// create a fetchTodos function, that fetches all the todos from the database
import type { Todo } from '../routes/+page.svelte';

export async function addTodo(todo: Todo) {
    try {
        const { data, error } = await supabase.from('todolist').insert(todo);
        if (error) {
            throw new Error(error.message);
        }
        console.log('Fetched data', data);
        return data;
    } catch (error) {
        console.error('There was an error fetching data (adding todo):', error);
        return null;
    }
}

export async function updateTodo(todo: Todo) {
    try {
        const { data, error } = await supabase.from('todoList Table').update(todo).match({ id: todo.id });
        if (error) {
            throw new Error(error.message);
        }
        console.log ('Updated data:', data);
        return data; 
    }   catch (error) {
        console.error('Error updating todo: ', error);
        return null;
    }
}

export async function clearCompletedTodos() {
    try {
      const { data, error } = await supabase.from('todoList Table').delete().match({ status: true });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error('Error clearing completed todos:', error);
      return null;
    }
  }
  
export async function fetchTodos() {
    try {
        const {data, error} = await supabase.from('todoList').select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data || [];
    } catch (error) {
        console.error('There was an error fetching data: ', error);
        return [];
    }
}