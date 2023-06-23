import { addTodo, updateTodo, clearCompletedTodos } from '../api/dataService';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from '../routes/+page.svelte';

export async function add(title: string): Promise<void> {
    const idUUID = uuidv4(); 
    const newTodo: Todo = { id: idUUID, title: title, status: false };
    await addTodo(newTodo);
}

export async function updateTodoStatus(todo: Todo): Promise<void> {
    await updateTodo(todo);
}

export async function clear(todos: Todo[]): Promise<Todo[]> {
    const updatedTodos = todos.filter((task: Todo) => !task.status);
    await clearCompletedTodos();
    return updatedTodos;
}
