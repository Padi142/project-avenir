<script lang="ts">
	import { scans } from '$lib/db/schema/scan';
    import type { PageData } from './$types';
	import MessageStatus from './components/MessageStatus.svelte';

	export let data: PageData;

</script>


<div class="w-full flex flex-col justify-center items-center">
    <h>ahoj</h>
    <div class="w-50">
        <table class="table">
            <thead>
                <tr>
                  <th>Id</th>
                  <th>Found on</th>
                </tr>
              </thead>
            {#each data.scans as scan, i}
            <tr>
                <th>{i + 1}</th>
                <td>{scan.scannedOn}</td>
                <td>
                    <MessageStatus message={data.messages[i]}></MessageStatus>
                </td>
            </tr>
            {/each}
        </table>
    </div>
</div>
