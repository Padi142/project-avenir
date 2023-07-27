<script lang="ts">
	export let showSendMessageModal: boolean; // boolean

	let dialog: any; // HTMLDialogElement

	$: if (dialog && showSendMessageModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showSendMessageModal = false)}
	on:click|self={() => dialog.close()}
	class="my-30 bg-slate-900 modal-box w-11/12"
>
	<div class="flex flex-col justify-center items-center">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click|stopPropagation>
			<div class="desktop:text-3xl text-1xl text-center">
				Send a message to the next person who finds this code!
			</div>
			<form
				method="POST"
				action="?/send_code_message"
				class="form-control max-w-lg mx-6 ustify-center items-center"
			>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Message</span>
				</label>
				<input
					type="text"
					placeholder="10 characters max"
					name="messageField"
					class="input input-bordered w-full max-w-lg"
				/>
				<button on:click={() => dialog.close()} class="btn btn-accent mt-8 w-2/5">Send</button>
			</form>
		</div>
	</div>
</dialog>
