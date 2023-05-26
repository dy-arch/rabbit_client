<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export { className as class };
	export let active: boolean = false;

	const dispatch = createEventDispatcher();

	let className: string = "";
</script>

<button id="hambergerButton" class={`${className} ${active ? "open" : ""}`} on:click>
	<span class="bergerLine line1" />
	<span class="bergerLine line2" />
	<span class="bergerLine line3" />
</button>

<style lang="scss">
	#hambergerButton {
		width: 1.25rem;
		height: 1rem;
		background-color: transparent;

		.bergerLine {
			position: absolute;
			display: block;
			width: 100%;
			height: 20%;
			background-color: var(--app-white);
			border-radius: 1rem;
			// transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
			transition: all 0.4s cubic-bezier(1, -0.8, 0.6, 0.4);
		}

		.line1 {
			top: 0;
			left: 0;
		}

		.line2 {
			top: 40%;
			left: 0;
		}

		.line3 {
			bottom: 0;
			left: 0;
		}

		&.open .line1 {
			top: 40%;
			transform: rotate(45deg);
		}

		&.open .line2 {
			top: 40%;
			left: 50%;
			opacity: 0;
		}

		&.open .line3 {
			bottom: 40%;
			left: 0;
			transform: rotate(-45deg);
		}
	}

	// @keyframes line1Open {
	// 	0% {
	// 		top: 0;
	// 	}
	// 	50% {
	// 		top: 40%;
	// 	}
	// 	100% {
	// 		top: 40%;
	// 		transform: rotate(45deg);
	// 	}
	// }

	// @keyframes line2Open {
	// 	0% {
	// 		top: 40%;
	// 		left: 0;
	// 		opacity: 1;
	// 	}
	// 	50% {
	// 		top: 40%;
	// 		left: 0;
	// 		opacity: 1;
	// 	}
	// 	100% {
	// 		top: 40%;
	// 		left: 100%;
	// 		opacity: 0;
	// 	}
	// }

	// @keyframes line3Open {
	// 	0% {
	// 		bottom: 0;
	// 	}
	// 	50% {
	// 		top: 40%;
	// 	}
	// 	100% {
	// 		top: 40%;
	// 		transform: rotate(-45deg);
	// 	}
	// }

	// @keyframes line1Close {
	// 	0% {
	// 		top: 0;
	// 	}
	// 	50% {
	// 		top: 40%;
	// 	}
	// 	100% {
	// 		top: 40%;
	// 		transform: rotate(45deg);
	// 	}
	// }

	// @keyframes line2Close {
	// 	0% {
	// 		top: 40%;
	// 		left: 0;
	// 		opacity: 1;
	// 	}
	// 	50% {
	// 		top: 40%;
	// 		left: 0;
	// 		opacity: 1;
	// 	}
	// 	100% {
	// 		top: 40%;
	// 		left: 100%;
	// 		opacity: 0;
	// 	}
	// }

	// @keyframes line3Close {
	// 	0% {
	// 		bottom: 0;
	// 	}
	// 	50% {
	// 		top: 40%;
	// 	}
	// 	100% {
	// 		top: 40%;
	// 		transform: rotate(-45deg);
	// 	}
	// }
</style>
