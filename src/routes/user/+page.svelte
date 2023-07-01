<!-- src/routes/+page.svelte -->

<script lang="ts">
	import { User } from '$lib/db/schema/users';

	export let data;
</script>

<p>
	{#await data}
		Loading...
	{:then data}
		Hello {data.user[0].name}
	{:catch error}
		{error.message}
	{/await}
</p>
