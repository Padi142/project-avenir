<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores'
	import { fade } from 'svelte/transition';

	let userChecked = false
	let loginValue = '';

	function checkUser(){
		if(loginValue.length == 64){
			goto('/dashboard')
			return
		}
		userChecked = true;
	}
  </script>
  

<div class="flex flex-col gap-4 justify-center items-center ">
	
	<p class ="my-12"></p>
	<p class="text-4xl my-2">You found it! Congrats!</p>
	<p class="text-1xl my-2"> {$page.params.codeID}</p>
	<p class ="my-5"></p>

	<div class="form-control w-full max-w-lg mh-6">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="label">
		  <span class="label-text">Wanna log in?</span>
		</label>
		<input bind:value={loginValue} type="text" placeholder="" class="input input-bordered w-full max-w-lg" />
	</div>
	<button class="btn btn-ghost" on:click={checkUser}>get in</button>

	{#if userChecked}
	<div transition:fade class="flex flex-col gap-4 justify-center items-center ">
		<p class="text-xl my-3"> It seems that you are not registered...</p>
		<p class="text-base my-2">We've created an account for your convinience:</p>
		<p class="text-sm my-4 ">3f3b08eca62c21d76256e6e1d0b8bf99f4efbe376f64335b72f4163a8fc50dba</p>
	</div>
		
	{/if}
</div>
