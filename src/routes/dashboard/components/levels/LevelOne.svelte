<script lang="ts">
	import type { User } from '$lib/db/schema/users';

	export let isNewUser: boolean;
	export let user: User;
</script>

<div class="flex flex-col justify-center items-center">
	<p class="my-4" />
	{#if isNewUser}
		<p class="text-5xl my-2">Congratulations!</p>
	{/if}
	<p class="text-2xl mt-4">{user.level} {user.level == 1 ? 'code' : 'codes'}</p>
	<div class="flex justify-center p-2">
		<p class="text-white text-4xl">{user.level}</p>
		<p class="text-white text-4xl px-2">/</p>
		<p class="text-white text-4xl blur cursor-not-allowed select-none">99</p>
	</div>
	{#if isNewUser}
		<div class="py-6">
			<p class="text-xl text-center">It seems that you found your first code!</p>
			<p class="text-center">
				More codes you find, more stuff you unlock. This is all you can see now.
			</p>
		</div>
	{/if}
</div>
