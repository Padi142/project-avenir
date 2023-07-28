<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
	import * as Icon from 'svelte-heros';
	// import { Icon } from 'leaflet';

    let mapElement;
    let map;

    onMount(async () => {
        if(browser) {
            const leaflet = await import('leaflet');

            map = leaflet.map(mapElement).setView([49.194796, 16.611592], 13);

            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            leaflet.marker([49.202636, 16.628546]).addTo(map)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup();
        }
    });

    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });
</script>
 <div class="w-full flex flex-col justify-start items-center h-full">
	<!-- <div class="flex justify-between items-center desktop:w-2/3 w-11/12 my-6">
		<a href="/dashboard" class="">
			<Icon.ArrowLeft size="30" />
		</a>
		<h>The codes you found</h>
		<div class="w-10"></div>
	</div> --> 
    <div class="h-4/5" bind:this={mapElement}></div>
</div>
<style>
    @import 'leaflet/dist/leaflet.css';
</style>