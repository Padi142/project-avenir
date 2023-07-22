<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import HashBox from './components/HashBox.svelte';
	import LevelOne from './components/levels/LevelOne.svelte';
	import Questions from './components/Questions.svelte';
	import { users } from '$lib/db/schema/users';
	import SendCodeMessage from './components/SendCodeMessage.svelte';

	export let data: PageData;

	let showModal = false;

	let hashValue = data.user?.hash;
</script>

<div
	class="flex flex-col gap-4 justify-between items-center w-full max-h-max"
	in:fade={{ delay: 1200, duration: 400 }}
>
<div class ="flex flex-row w-full justify-between">
	<div class=""></div>
	<a href="dashboard/history" class="mx-16">History</a>
</div>

	<LevelOne isNewUser={data.isFirstLogin} user={data.user} />

	<HashBox hashValue={hashValue ?? ''} />

		<!-- Open the modal using ID.showModal() method -->
		<button class="btn" on:click={() => (showModal = true)}> show modal </button>

		<SendCodeMessage bind:showModal></SendCodeMessage>

	<Questions user={data.user} />
</div>
