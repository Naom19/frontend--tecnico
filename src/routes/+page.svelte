<script context="module" lang="ts">
	export interface Todo {
		id: string;
		title: string;
		status: boolean;
	}
 </script>

<script lang="ts">
    // import { text } from "@sveltejs/kit";
    import '../global.css';
	import { onMount } from 'svelte';
	import { addTodo, updateTodo, clearCompletedTodos, fetchTodos } from '../api/dataService';
	import { v4 as uuidv4 } from 'uuid';

    let todos: Todo[] = [];
	let newTodoTitle = '';
	

    async function add(title: string): Promise<void> {
		const idUUID = uuidv4(); // creates UUID randomly
		const newTodo: Todo = {id: idUUID,title: title, status: false};
		todos = todos.concat(newTodo);
		await addTodo(newTodo);
		newTodoTitle='';
	}

	async function updateTodoStatus(todo:Todo): Promise<void> {
		todo.status = !todo.status;
		await updateTodo(todo);
	}

    async function clear(): Promise<void> {
        todos = todos.filter((task: Todo) => !task.status);
		await clearCompletedTodos();
    }

    let pending: number;
    $: pending = todos.filter(task => !task.status).length;

	let total: number;
	$: total = todos.length;

	onMount(async () => {
		const fetchedTodos = await fetchTodos();
		todos = fetchedTodos;
	});


</script>

<div class="navBar">
	<h1>Task Master</h1>
	<button class="navBtns">
		Log In
	</button>
	<button class="navBtns">Download</button>
</div>


{#each todos as todo (todo.title)}
    <div class:done = {todo.status}>
        <input type="checkbox" 
         bind:checked={todo.status} on:change={() => updateTodoStatus(todo)} />
        <input bind:value={newTodoTitle} type="text" 
		placeholder="Add a new to do..." class="todoInput" />
    </div>
    
{/each}


<button class="addBtn" on:click= {() => add(newTodoTitle)}>Add</button> 

<button class="clearBtn" on:click={clear}>Clear completed</button>

<p id="totalTodos">Total: {total} completed | {pending} pending </p>

<p id="quote">"I think it is possible for ordinary people to choose to be extraordinary." - Elon Musk</p>

<style>

	.navBar {
		display: flex;
		justify-content: space-around;
		height: 3em;
		width: 100%;
		margin-bottom: 2em;
		background-color: #2d767f;
	}
    h1 {
        color: #ffffff;
		font-size: large;
		padding-right: 8em;
    }
	
	.navBtns {
		border: 0;
		background-color: #2d767f;
		color:#ffffff;
		font-family: 'Nunito Sans', sans-serif;
		font-weight: bold;
		font-size: 0.9em;
	}
    .done {
		display: flex;
		justify-content: center;
		align-items: center;
        opacity: 0.3;
    }
	
	.todoInput {
		height: 2.5em;
		width: fit-content;
		background-color: #ecfffb;
		border-radius: 4%; 
		border: 1.5px solid #2d767f; /* make the line border more svelte */
		font-size: small;
		text-align: center;
		margin: 1em;
	} 

    .addBtn {
        background-color: #2d767f;
        font-family: 'Nunito Sans', sans-serif;
        color: #ffffff;
		font-weight: bold;
		border-radius: 7%;
		border: 0;
    }

	.clearBtn{
		background-color: #2d767f;
		font-family: 'Nunito Sans', sans-serif;
		color: #ffffff;
		font-weight: bold;
		border-radius: 7%;
		border: 0;
	}

	#totalTodos{
		font-size: medium;
		color: #1e6262;
	}

	#quote {
		font-style: italic;
		color: #1e6262;
	}


</style>