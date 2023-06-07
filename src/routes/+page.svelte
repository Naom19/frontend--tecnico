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
		margin-bottom: 2em;
		background-color: #2d767f;
	}
    h1 {
        color: #ffffff;
		font-size: large;
		padding-right: 8em;
    }
	
	#logInBtn {
		background-image: ;
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
		display: flex;
		justify-content: center;
		align-items: center;
        opacity: 0.3;
    }

	#checkIcon {
		background-color: #2d767f;
		/* image */
	} 
	
	#todoInput {
		height: 2.5em;
		width: fit-content;
		background-color: #ecfffb;
		border-radius: 2%;
		border-color: solid #2d767f;
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