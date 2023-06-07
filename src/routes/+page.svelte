<script lang="ts">
    import { text } from "@sveltejs/kit";
    import '../global.css';

    let todos: App.Todo[] = [
        { done: false, text: 'This is a To Do example'}
    ];

    function add(): void {
        todos = todos.concat({ done: false, text: ''});
    }

    function clear(): void {
        todos = todos.filter((task:App.Todo) => !task.done);
    }

    let pending: number;
    $: pending = todos.filter(task => !task.done).length;

</script>

<div class="navBar">
	<h1>Task Master</h1>
	<button id="logInBtn">LogIn</button>
	<button id="backBtn"></button>
</div>


{#each todos as todo (todo.text)}
    <div class:done = {todo.done}>
        <input type="checkbox" id="checkIcon"
         bind:checked={todo.done} />
        <input placeholder="Add a new to do..." 
		 id="todoInput"
         value={todo.text} />

    </div>
    
{/each}


<button class="addBtn" on:click={add}>Add</button>

<button class="clearBtn" on:click={clear}>Clear completed</button>

<p id="totalTodos">{pending} pending</p>

<p id="quote">"I think it is possible for ordinary people to choose to be extraordinary." - Elon Musk</p>

<style>

	.navBar {
		display: flex;
		justify-content: space-around;
		height: 3em;
		width: 100%;
		padding-bottom: 0.3em;
		margin: 2em;
		border-bottom: 3px solid #17b794;
	}
    h1 {
		
        color: #ffffff;
		font-size: large;
		padding-right: 8em;
    }
	
	#logInBtn {
		background-color: transparent;
		border: 0;
		border-radius: 100%;
		color: #ffffff;
	}

	#backBtn{
		background-color: transparent;
		border: 0;
		border-radius: 50%;
	}
    .done {
		background-color: #ffffff;
		height: fit-content;
		width: 10em;
        opacity: 0.3;
    }

	/* #checkIcon {
		background-image: ;
	}
	
	#todoInput {
		height:
		width:
		background-color:
		border-radius:
		text-size:
	} */

    .addBtn {
        background-color: #17b794;
        font-family: 'Nunito Sans', sans-serif;
        color: #01005e;
		font-weight: bold;
		border-radius: 7%;
		border: 0;
    }

	#totalTodos{
		font-size: medium;
		color: #ffffff;
	}

	#quote {
		font-style: italic;
		color: #ffffff;
	}


</style>