<script lang="ts">
    import { text } from "@sveltejs/kit";

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

<h1>Task Master</h1>

{#each todos as todo (todo.text)}
    <div class:done = {todo.done}>
        <input type="checkbox"
         bind:checked={todo.done} />
        <input placeholder="Add a new to do..." 
         bind:value={todo.text} />

    </div>
    
{/each}

<p>{pending} pending</p>

<button on:click={add}>Add</button>

<button on:click={clear}>Clear completed</button>

<style>
    h1 {
        background-color: #22267b;
        color: #ffffff;
    }
    
    .done {
        opacity: 0.3;
    }

    button {
        background-color: #17b794;
        color: #01005e;
    }
</style>