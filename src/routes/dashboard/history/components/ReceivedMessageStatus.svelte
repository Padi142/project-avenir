<script lang="ts">
	import type { CodeMessage } from '$lib/db/schema/code_messages';
	import SendMessageButton from './SendMessageDialog.svelte';
	import MessageDetailDialog from './MessageDetailDialog.svelte';

	export let message: CodeMessage | null | undefined;

	let showSendMessageModal = false;
	let showMessageDetailDialog = false;
</script>

{#if message == null}
	<h1>No message</h1>
{:else}
	<button class="btn" on:click={() => (showMessageDetailDialog = true)}> Read message </button>
{/if}

<SendMessageButton bind:showSendMessageModal />
<MessageDetailDialog bind:showMessageDetailDialog {message} />
