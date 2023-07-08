<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import HashBox from './components/HashBox.svelte';
	import LevelOne from './components/levels/LevelOne.svelte';
	import Questions from './components/Questions.svelte';
	import { users } from '$lib/db/schema/users';

	export let data: PageData;
	let hashValue = data.user?.hash;
</script>

<div
	class="flex flex-col gap-4 justify-between items-center max-h-max"
	in:fade={{ delay: 1200, duration: 400 }}
>
	<LevelOne isNewUser={data.isFirstLogin} user={data.user} />

	<HashBox hashValue={hashValue ?? ''} />

	<Questions user={data.user} />
</div>
