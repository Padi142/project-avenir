<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col gap-4 justify-center items-center">
	<p class="my-12" />
	<p class="text-5xl my-2" in:fade={{ delay: 500, duration: 500 }}>You found:</p>
	<p class="text-2xl my-12" in:fade={{ delay: 1000, duration: 40 }}>1 code</p>
	<p class="text-2xl my-12" in:fade={{ delay: 1000, duration: 40 }}>{data.user?.name}</p>
</div>
