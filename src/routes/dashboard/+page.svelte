<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
	let hashValue = data.user?.hash;

	const copyToClipboard = () => {
    navigator.clipboard.writeText(hashValue ?? "");
  };
</script>

<div class="flex flex-col gap-4 justify-center items-center" in:fade={{ delay: 1200, duration: 400 }}>
	<p class="my-8" />
	<p class="desktop:text-3xl text-2xl my-1" >Name:</p>

	<p class="text-2xl my-1" >{data.user?.name}</p>
	<p class="text-5xl my-2" >You found:</p>
	<p class="text-2xl mt-4" >1 code</p>
	
	<p class="desktop:text-3xl text-2xl mt-4" >Your login hash:</p>
	<div  class="flex items-center max-w-full">
		<input bind:value={hashValue} type="text" placeholder="" readonly class="input input-bordered w-full max-w-full select-text " />
		<button
		  class="ml-2 bg-blue-500 text-white py-2 px-4 rounded"
		  on:click={copyToClipboard}
		>
		  Copy
		</button>
	  </div>
	<p class="text-base" >keep this safe</p>
	<p class="text-xs " >you won't be able to recover this later</p>

</div>
