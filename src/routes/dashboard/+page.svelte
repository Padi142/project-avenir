<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col gap-4 justify-center items-center">
	<p class="my-12" />
	<p class="text-5xl my-2" in:fade={{ delay: 500, duration: 500 }}>You found:</p>
	<p class="text-2xl my-12" in:fade={{ delay: 1000, duration: 400 }}>1 code</p>
	<p class="text-2xl my-4" in:fade={{ delay: 1200, duration: 400 }}>{data.user?.name}</p>
	<p class="desktop:text-3xl text-2xl my-4" in:fade={{ delay: 1200, duration: 400 }}>You'r login hash:</p>
	<p class="desktop:text-2xl text-1xl my-4" in:fade={{ delay: 1200, duration: 400 }}>{data.user?.hash}</p>
</div>
