<script lang="ts">
	import { fade } from 'svelte/transition';

	let showDiv = false;

	setTimeout(() => {
		showDiv = true;
	}, 8000);

	setTimeout(() => {
		showDiv = false;
	}, 15000);
</script>

<div class=" hero flex flex-col gap-4 justify-center items-center min-w-full min-h-max">
	<div class="hero-content text-center my-6">
		<div class="max-w-md">
			<div class="glitchEffect desktop:text-5xl text-3xl font-bold" title="Looking for answers ?">
				Looking for answers ?
			</div>
			<p class="text-3xl pt-6 pb-4">This might be all you'll ever seek</p>
			<p class="text-2xl py-1">Well don't mess around and get out...</p>
			{#if showDiv}
				<div
					class="glitchEffect text-sm py-1 text-white"
					in:fade={{ duration: 1200 }}
					out:fade={{ duration: 400 }}
					title="Into the real world"
				>
					Into the real world
				</div>
			{/if}
			<a href="/codes" class="btn btn-primary my-6">Start</a>
		</div>
	</div>
</div>

<style lang="scss">
	.glitchEffect {
		animation: glitch 420ms linear infinite;
	}

	@keyframes glitch {
		2%,
		64% {
			transform: translate(2px, 0) skew(0deg);
		}
		4%,
		60% {
			transform: translate(-2px, 0) skew(0deg);
		}
		62% {
			transform: translate(0, 0) skew(5deg);
		}
	}

	div:before,
	div:after {
		content: attr(title);
		position: absolute;
		left: 0;
	}

	div:before {
		animation: glitchTop 1s linear infinite;
		clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
		-webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
	}

	@keyframes glitchTop {
		2%,
		64% {
			transform: translate(2px, -2px);
		}
		4%,
		60% {
			transform: translate(-2px, 2px);
		}
		62% {
			transform: translate(13px, -1px) skew(-13deg);
		}
	}

	div:after {
		animation: glitchBotom 1.5s linear infinite;
		clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
		-webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
	}

	@keyframes glitchBotom {
		2%,
		64% {
			transform: translate(-2px, 0);
		}
		4%,
		60% {
			transform: translate(-2px, 0);
		}
		62% {
			transform: translate(-22px, 5px) skew(21deg);
		}
	}
</style>
