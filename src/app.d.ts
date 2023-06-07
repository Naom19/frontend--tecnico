// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// Typescript declaration file across multiple svelte components
declare global {
	namespace App {
		interface Todo {
			done: boolean;
			text: string;
		}
	}
}

export {};
