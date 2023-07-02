// snackbar.ts
import { writable, type Writable } from 'svelte/store';

export interface Snackbar {
	message: string;
	duration: number;
}

export const snackbar: Writable<Snackbar | null> = writable(null);

export const showSnackbar = (message: string, duration = 3000): void => {
	snackbar.set({ message, duration });
};
