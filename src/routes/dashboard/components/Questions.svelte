<script lang="ts">
	import type { User } from '$lib/db/schema/users';

	export let user: User;
</script>

{#if user.isAdmin}
	<a href="/codes/create" class="py-12 text-xs"> ??? </a>
{:else}
	<a href="/codes" class="py-12 text-xs"> ??? </a>
{/if}
