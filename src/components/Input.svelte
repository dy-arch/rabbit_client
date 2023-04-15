<script lang="ts">
	let className: string = "";

	export { className as class };
	export let value: string = "";
</script>

<input class={className} bind:value {...$$restProps} />

<style lang="scss">
	input {
		border-radius: 5px;
		background-color: var(--app-white);

		&:focus::placeholder {
			opacity: 0;
		}
	}
</style>
