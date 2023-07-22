<script lang="ts">
    import type { CodeMessage } from "$lib/db/schema/code_messages";
    export let showMessageDetailDialog: boolean; // boolean
    
    export let message : CodeMessage | null

    let dialog: any; // HTMLDialogElement
    
    $: if (dialog && showMessageDetailDialog) dialog.showModal();
    </script>
    
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
    <dialog
        bind:this={dialog}
        on:close={() => (showMessageDetailDialog = false)}
        on:click|self={() => dialog.close()}
        class="my-30 bg-slate-900 modal-box w-11/12 "
        >
        <div class="flex flex-col justify-center items-center">
    
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click|stopPropagation>
                {#if message}
                <div class="desktop:text-3xl text-1xl text-center">
                  {message.message }
                </div>
              {:else}
              <div class="desktop:text-3xl text-1xl text-center">
                No message
                </div>
              {/if}
              
            </div>
        </div>
    
    </dialog>
    