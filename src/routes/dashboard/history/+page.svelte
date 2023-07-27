<script lang="ts">
	import { scans } from '$lib/db/schema/scan';
	import type { PageData } from './$types';
	import ReceivedMessageStatus from './components/ReceivedMessageStatus.svelte';
	import SentMessageStatus from './components/SentMessageStatus.svelte';
	import * as Icon from 'svelte-heros';
	export let data: PageData;
</script>

<div class="w-full flex flex-col justify-center items-center">
	<div class="flex justify-start desktop:w-2/3 w-3/4">
		<a href="/dashboard" class="w-full">
			<Icon.ArrowLeft size="30" />
		</a>
	</div>
	<h>The codes you found</h>
	<div class="w-50">
		<table class="table">
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
					<td>{scan.scan_records?.scannedOn}</td>
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
</div>
