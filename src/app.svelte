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