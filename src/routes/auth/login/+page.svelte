<script lang="ts">
	import { goto } from "$app/navigation";
	import loginBackground from "$lib/images/loginBack_1.jpg";
	import { login } from "../../../api/auth";
	import Button from "../../../components/Button.svelte";
	import Input from "../../../components/Input.svelte";
	import { user } from "../../../store/user";

	let id: string = "";
	let password: string = "";
	let error: string = "";

	async function loginSubmitHandler(e: Event) {
		error = "";

		if (!id || !password) {
			error = "아이디와 비밀번호를 입력하세요";
			return;
		}
		const { data, message } = await login({ id, password });

		if (message) {
			error = message;
			return;
		}

		user.set(data);
		goto("/", { replaceState: true });
	}
</script>

<main id="loginPage">
	<section id="loginSection">
		<header class="appLogo">
			<h1>RABBIT</h1>
			<!-- <h1>PROJECT</h1> -->
		</header>

		<form class="loginInput" on:submit|preventDefault={loginSubmitHandler}>
			<Input class="inputId" bind:value={id} type="text" placeholder="Email" />

			<Input class="inputPass" bind:value={password} type="password" placeholder="Password" />

			<div class="errorBox">
				<p class="error">{error}</p>
			</div>

			<Button id="hi" class="loginButton" theme="dark" type="submit">로그인</Button>
		</form>
	</section>

	<section id="backgroundSection">
		<img class="loginBackground" src={loginBackground} alt="" />
	</section>
</main>

<style lang="scss">
	#loginPage {
		position: relative;
		width: 100%;
		height: 100vh;
	}

	#loginSection {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.appLogo {
			line-height: 1;
			font-size: 4rem;
			color: var(--app-dark-green);
			// margin-top: -12%;
			margin-bottom: 5.8rem;
		}

		.loginInput {
			display: flex;
			flex-direction: column;
			// gap: 1rem;
		}

		:global(.inputId),
		:global(.inputPass) {
			width: 15rem;
			height: 2rem;
			padding: 0 1rem;
			text-align: center;
			font-size: 0.8rem;
			box-sizing: border-box;
			// margin-bottom: 1rem;
		}

		:global(.inputId) {
			margin-bottom: 1rem;
		}

		.errorBox {
			position: relative;
			height: 1.7rem;
		}

		.error {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 20rem;
			color: var(--app-red300); // todo error message 색상이 다소 어색
			font-size: 0.7rem;
			text-align: center;
		}

		:global(.loginButton) {
			width: 15rem;
			height: 2.25rem;
		}
	}

	#backgroundSection {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		background-color: #e5e5e5;

		.loginBackground {
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: opacity(70%);
		}
	}
</style>
