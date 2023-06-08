<script lang="ts">
    import { text } from "@sveltejs/kit";
    import '../global.css';

    let todos: App.Todo[] = [];

    function add(initialText: string): void {
        todos = todos.concat({ done: false, text: initialText });
    }

    function clear(): void {
        todos = todos.filter((task:App.Todo) => !task.done);
    }

    let pending: number;
    $: pending = todos.filter(task => !task.done).length;

</script>

<div class="navBar">
	<h1>Task Master</h1>
	<button class="navBtns">
		Log In
	</button>
	<button class="navBtns">Download</button>
</div>


{#each todos as todo (todo.text)}
    <div class:done = {todo.done}>
        <input type="checkbox" 
         bind:checked={todo.done} />
        <input placeholder="Add a new to do..." 
		 class="todoInput"
         value={todo.text} />

    </div>
    
{/each}


<button class="addBtn" on:click= {() => add('')}>Add</button>

<button class="clearBtn" on:click={clear}>Clear completed</button>

<p id="totalTodos">Total {pending} pending | Completed </p>

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