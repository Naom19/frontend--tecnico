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

<section class="gralContainer">
	{#each todos as todo}
	<div class="listContainer">
		<div class:done = {todo.status}>
			<input type="checkbox" class="checkIcon"
			 bind:checked={todo.status} on:change={() => updateTodoStatus(todo)} />
			<input bind:value={todo.title} type="text" 
			placeholder="Add a new to do..." class="todoInput" />
		</div>
	</div>
    
{/each}

<div class="bottomContainer">
	<div class="btnsContainer">
		<button class="addBtn" on:click= {() => add(newTodoTitle)}>Add</button> 
		<button class="clearBtn" on:click={clear}>Clear completed</button>
	</div>
	<p id="totalTodos">Total: {total} | {pending} pending </p>
	<p id="quote">"I think it is possible for ordinary people to choose to be extraordinary." - Elon Musk</p>
</div>

</section>

<style>


@media screen and (min-width: 320px) {
	.navBar{
		width: 100%;
	}
    .gralContainer{
        width: 45%;
    }
    .listContainer {
        width: 45%;
    }
}

@media screen and (min-width: 700px) {
	.navBar{
		width: 100%;
	}
    .gralContainer {
        width: 45%;
    }
    .listContainer {
        width: 45%;
    }
}

@media screen and (min-width: 1000px) {

	.navBar{
		width: 100%;
	}
    .gralContainer {
        width: 45%;
    }
    .listContainer {
        width: 45%;
    }
}


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

	.listContainer{
		display: flex;
		justify-content: center;
		height: fit-content;
		padding: 0.5em 1em 1em;
	}

    .done {
        opacity: 0.3;
    }

	.gralContainer{
		display: flex;
		justify-content: center;
		flex-direction: column;
		background-color: #2d767f;
		height: fit-content;
		max-width: 45%; 
		border-radius: 10%;
		border: 2px solid #2d767f;
		margin-top: 5em;
		margin-left: auto;
		margin-right: auto;
		padding: 1em;
		box-sizing: border-box;
		box-shadow: 0.5em 0.5em 3em #1e6262;
	}

	.todoInput {
		position: absolute;
		height: 2.5em;
		width: 15%;
		background-color: #ecfffb;
		border-radius: 4%; 
		border: 1.5px solid #2d767f; 
		font-size: small;
		text-align: center;
		margin: auto;
		padding-left: 1em;
		padding-right: 1em;
	} 

	.checkIcon{
		margin: 1em;
	}
	.btnsContainer{
		display: flex;
		justify-content: center;
	}

	.bottomContainer{
		background-color: #ecfffb;
		border-bottom: 2px solid #2d767f;
		border-top: 10px solid #ecfffb;
		border-radius: 5%;
		margin-top: 1em;
		margin-bottom: -1em;
	}

    .addBtn {
        background-color: #2d767f;
        font-family: 'Nunito Sans', sans-serif;
        color: #ffffff;
		font-weight: bold;
		border-radius: 10%;
		border: 0;
		margin: 1em;
		padding: 0.5em;
    }

	.clearBtn{
		background-color: #2d767f;
		font-family: 'Nunito Sans', sans-serif;
		color: #ffffff;
		font-weight: bold;
		border-radius: 4%;
		width: 9em;
		height: 2.6em;
		border: 0;
		margin-top: 0.87em;
		
	}

	#totalTodos{
		font-size: medium;
		color: #1e6262;
		padding-left: 1.5em;
	}

	#quote {
		font-style: italic;
		font-weight: bold;
		color: #1e6262;
		padding: 1em;
		border-bottom: #2d767f;
		border-radius: 15%;
	}


</style>