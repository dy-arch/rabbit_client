<script lang="ts">
	import HambergerButton from "../components/HambergerButton.svelte";

	let sideActive: boolean = false;
	$: sideClass = sideActive ? "active" : "";

	function hambergerClickHandler() {
		if (sideActive) {
			sideActive = false;
		} else {
			sideActive = true;
		}
	}
</script>

<svelte:head>
	<title>rabbit</title>
</svelte:head>

<main id="mainPage">
	<aside id="sideMenu" class={sideClass}>
		<HambergerButton class="expandButton" active={sideActive} on:click={hambergerClickHandler} />
	</aside>
	<a href="/auth/login">로그인페이지</a>
</main>

<style lang="scss">
	#mainPage {
		display: flex;
		width: 100%;
		height: 100vh;
	}

	#sideMenu {
		position: relative;
		width: 2.5rem;
		background: var(--app-dark-green);
		transition: width 0.4s ease-in-out;

		&.active {
			width: 20%;
		}
	}

	:global(.expandButton) {
		position: absolute;
		top: 0.6rem;
		right: 0.65rem;
	}
</style>
