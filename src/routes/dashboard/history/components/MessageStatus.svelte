<script lang="ts">
	import type { CodeMessage } from "$lib/db/schema/code_messages";
	import SendMessageButton from "./SendMessageDialog.svelte";
	import MessageDetailDialog from "./MessageDetailDialog.svelte";


    export let message :  CodeMessage | null

    let showSendMessageModal = false
    let showMessageDetailDialog = false

</script>

{#if message == null}
    <button class="btn" on:click={() => (showSendMessageModal = true)}> Send message </button>
{:else}
    <button class="btn" on:click={() => (showMessageDetailDialog = true)}> Read message </button>
{/if}

<SendMessageButton bind:showSendMessageModal></SendMessageButton>
<MessageDetailDialog bind:showMessageDetailDialog message={message} ></MessageDetailDialog>