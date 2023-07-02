<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col gap-4 justify-center items-center mx-6">
	<p class="my-12" />
	<!-- <p class="text-4xl my-2">You found it! Congrats!</p>
		
		<p class="my-5" /> -->
	<p class="text-2xl my-2">Wanna know more?</p>
	<form
		method="POST"
		action="?/login"
		class="form-control w-full max-w-lg mx-6 ustify-center items-center"
	>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label w-full">
			<span class="label-text">Enter your desired name / login hash</span>
		</label>
		<input
			type="text"
			placeholder=""
			name="loginValue"
			class="input input-bordered w-full max-w-lg"
		/>
		<button class="btn btn-accent my-6 w-2/5">Let's go</button>
	</form>
</div>
