<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';

	let scanning = false;

	let uuid: string = '';
	let name: string = '';
	let location: string = '';

	let html5Qrcode: Html5Qrcode;

	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}

	const openQrScanner = (event: Event) => {
		event.preventDefault();

		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	};

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
	}

	function onScanSuccess(decodedText: string, decodedResult: any) {
		stop();
		uuid = decodedText;
	}

	function onScanFailure(error: any) {
		console.warn(`Code scan error = ${error}`);
	}
</script>

<form
	method="POST"
	action="?/create_code"
	class="flex flex-col gap-4 justify-center items-center mx-6"
>
	<div class="flex flex-col border-opacity-50 my-8 desktop w-full max-w-xs">
		<input
			type="text"
			placeholder="UUID"
			class="input input-bordered"
			bind:value={uuid}
			name="uuid"
		/>
		<div class="divider">OR</div>
		<reader id="reader" class="my-2" />
		{#if scanning}
			<button class="btn btn-neutral" on:click={stop}>stop</button>
		{:else}
			<button class="btn btn-neutral" on:click={openQrScanner}>Scan</button>
		{/if}
	</div>

	<input
		type="text"
		placeholder="Code name"
		class="input input-bordered my-2 w-full max-w-xs"
		bind:value={name}
		name="name"
	/>
	<input
		type="text"
		placeholder="Location"
		class="input input-bordered w-full max-w-xs mb-2"
		bind:value={location}
		name="location"
	/>
	{#if uuid.length === 36 && name != ''}
		<button class="btn btn-accent my-8">Create</button>
	{:else}
		<button class="btn btn-neutral btn-disabled">Create</button>
	{/if}
</form>
