<script lang="ts">
	export let hashValue: string;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(hashValue ?? '');
	};
</script>

<div class="flex flex-col justify-center items-center">
	<p class="desktop:text-3xl text-2xl mt-4">Your login hash:</p>
	<div class="flex items-center max-w-full">
		<input
			bind:value={hashValue}
			type="text"
			placeholder=""
			readonly
			class="input input-bordered w-full max-w-full select-text"
		/>
		<button class="ml-2 bg-blue-500 text-white py-2 px-4 rounded" on:click={copyToClipboard}>
			Copy
		</button>
	</div>
	<p class="text-base p-4">keep this safe</p>
	<p class="text-xs">you won't be able to recover this later</p>
</div>
