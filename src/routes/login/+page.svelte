<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<div class="w-full flex flex-col justify-center items-center">
	<h1>SvelteKit Auth Example</h1>

	{#if $page.data.session}
		{#if $page.data.session.user?.image}
			<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
		{/if}
		<span class="signedInText">
			<small>Signed in as</small><br />
			<strong>{$page.data.session.user?.name ?? 'User'}</strong>
		</span>
		<button on:click={() => signOut()} class="button">Sign out</button>
	{:else}
		<span class="notSignedInText">You are not signed in</span>
		<button on:click={() => signIn('github')}>Sign In with Github</button>
		<button on:click={() => signIn('discord')}>Sign In with Discord</button>
	{/if}
</div>
