<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import * as Icon from 'svelte-heros';
	import type { Map } from 'leaflet';
	import type { PageData } from './$types';

	let mapElement: HTMLElement;
	let map: Map;

	export let data: PageData;

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			map = leaflet.map(mapElement).setView([49.194796, 16.611592], 13);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			leaflet
				.marker([49.202636, 16.628546])
				.addTo(map)
				.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
				.openPopup();
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<div style="height: 800px   " class="ahoj-vyska" bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';
</style>
