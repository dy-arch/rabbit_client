<script lang="ts">
	let buttonId: string = "";
	let className: string = "";
	export let theme: "dark" | "light" = "dark";
	export { buttonId as id };
	export { className as class };
</script>

<button id={buttonId} class={`${theme} ${className}`} {...$$restProps}>
	<slot />
</button>

<style lang="scss">
	button {
		border-radius: 10px;
		color: var(--app-white);
		font-size: 0.8rem;
		transition: background-color 0.3s;

		&.dark {
			background-color: var(--app-dark-green50);
		}

		&.dark:hover {
			background-color: var(--app-dark-green);
		}
	}
</style>
