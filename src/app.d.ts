// See https://kit.svelte.dev/docs/types#app

import type { User } from "$lib/db/schema/users";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
		   user: User
		}
	}
}

export {};
