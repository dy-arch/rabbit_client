import { writable, type Writable } from "svelte/store";

interface User {
	id: string;
	name: string;
	role: "USER" | "ADMIN";
	isAllowed: boolean;
}

export const user: Writable<User | null> = writable(null);
