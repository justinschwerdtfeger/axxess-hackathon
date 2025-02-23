<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	// Icons
	import IconMenu from 'lucide-svelte/icons/menu';
	import Pill from 'lucide-svelte/icons/pill';
	import Eye from 'lucide-svelte/icons/eye';
	import Puzzle from 'lucide-svelte/icons/puzzle';
	import Physical from 'lucide-svelte/icons/biceps-flexed';
	import IconSettings from 'lucide-svelte/icons/settings';

	let hrefExample = '#';
	let innerWidth: number = $state(0);
</script>

<svelte:window bind:innerWidth />

{#if innerWidth >= 800}
	<div class="card grid h-dvh w-full grid-cols-[auto_1fr] border-[1px] border-surface-100-900">
		<!-- Component -->
		<Navigation.Rail>
			{#snippet tiles()}
				<Navigation.Tile id="0" label="Perscription" href="/prescription">
					<Pill />
				</Navigation.Tile>
				<Navigation.Tile id="1" label="Eye Timer" href="/eye-timer">
					<Eye />
				</Navigation.Tile>
				<Navigation.Tile id="2" label="Puzzle" href="/puzzle">
					<Puzzle />
				</Navigation.Tile>
				<Navigation.Tile id="3" label="Physical" href="/physical">
					<Physical />
				</Navigation.Tile>
			{/snippet}
		</Navigation.Rail>
		<!-- Content -->
		<div>
			{@render children()}
		</div>
	</div>
{/if}

{#if innerWidth < 800}
	<div class="card grid h-dvh w-full grid-rows-[1fr_auto] border-[1px] border-surface-100-900">
		<!-- Content -->
		<div>
			{@render children()}
		</div>
		<!-- Component -->

		<Navigation.Bar onchange={console.log}>
			<Navigation.Tile id="0" label="Prescription" href="/prescription">
				<Pill />
			</Navigation.Tile>
			<Navigation.Tile id="1" label="Eye timer" href="/eye-timer">
				<Eye />
			</Navigation.Tile>
			<Navigation.Tile id="2" label="Puzzle" href="/puzzle">
				<Puzzle />
			</Navigation.Tile>
			<Navigation.Tile id="3" label="Physical" href="physical">
				<Physical />
			</Navigation.Tile>
		</Navigation.Bar>
	</div>
{/if}
