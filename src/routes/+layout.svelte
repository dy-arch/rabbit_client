<script lang="ts">
	import { onMount } from "svelte";
	import { user } from "../store/user";
	import type { LayoutData } from "./$types";
	import "./global.scss";
	import "./reset.scss";

	export let data: LayoutData;

	onMount(async () => {
		const { user: userInfo } = data;

		user.set(userInfo);
	});
</script>

<slot />
