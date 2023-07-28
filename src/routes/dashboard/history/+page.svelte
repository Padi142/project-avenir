<script lang="ts">
	import {  format } from 'date-fns';
	import type { PageData } from './$types';
	import ReceivedMessageStatus from './components/ReceivedMessageStatus.svelte';
	import SentMessageStatus from './components/SentMessageStatus.svelte';
	import * as Icon from 'svelte-heros';
	export let data: PageData;
</script>

<div class="w-full flex flex-col justify-center items-center">
	<div class="flex justify-between items-center desktop:w-2/3 w-11/12 my-6">
		<a href="/dashboard" class="">
			<Icon.ArrowLeft size="30" />
		</a>
		<h>The codes you found</h>
		<div class="w-10"></div>
	</div>
		<table class="table overflow-x-scroll w-full mx-6">
			<thead>
				<tr>
					<th>Id</th>
					<th>Code name</th>
					<th>Found on</th>
					<th>Sent message</th>
					<th>Received message</th>
				</tr>
			</thead>
			{#each data.scans as scan, i}
				<tr>
					<th>{i + 1}</th>
					<td>{scan.code?.name}</td>
					{#if scan.scan_records && scan.scan_records?.scannedOn}
					<td>{format(scan.scan_records.scannedOn, 'dd-MM-yyyy HH:mm')}</td>
					{:else}
					<td></td>
					{/if}
					<td>
						<SentMessageStatus
							message={scan.sent_message}
						/>
					</td>
					<td>
						<ReceivedMessageStatus
							message={scan.received_message}
						/>
					</td>
				</tr>
			{/each}
		</table>
		
</div>
