<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { user } from "../store/user";
	import type { LayoutData } from "./$types";
	import "./global.scss";
	import "./reset.scss";
	import Cookies from "js-cookie";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	export let data: LayoutData;

	let pathname = $page.url.pathname;

	let userValidateInterval: NodeJS.Timer | null = null;

	function setUserValidateInterval() {
		if (pathname === "/auth/login") return;

		userValidateInterval = setInterval(() => {
			const unsubscribe = user.subscribe((user) => {
				if (!user) {
					goto("/auth/login");
				}
			});
			unsubscribe();
		}, 10000);
	}

	function clearUserValidateInterval() {
		if (userValidateInterval) {
			clearInterval(userValidateInterval);
		}
	}

	onMount(async () => {
		const { user: userInfo } = data;
		user.set(userInfo);

		setUserValidateInterval();
	});

	onDestroy(() => {
		clearUserValidateInterval();
	});
</script>

<slot />
