<script lang="ts">
    import { text } from "@sveltejs/kit";

    let todos: App.Todo[] = [
        { done: false, text: 'This is a To Do example'}
    ];

    function add(): void {
        todos = todos.concat({ done: false, text: ''});
    }
</script>