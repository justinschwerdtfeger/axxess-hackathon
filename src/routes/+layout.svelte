<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	// Icons
	import IconMenu from 'lucide-svelte/icons/menu';
	import IconFolder from 'lucide-svelte/icons/folder';
	import IconImage from 'lucide-svelte/icons/image';
	import IconMusic from 'lucide-svelte/icons/music';
	import IconVideo from 'lucide-svelte/icons/video';
	import IconSettings from 'lucide-svelte/icons/settings';

	let hrefExample = '#';
	let innerWidth: number = $state(0);
</script>

<svelte:window bind:innerWidth />

{#if innerWidth >= 800}
	<div class="card grid h-dvh w-full grid-cols-[auto_1fr] border-[1px] border-surface-100-900">
		<!-- Component -->
		<Navigation.Rail>
			{#snippet header()}
				<Navigation.Tile href="/" title="Menu"><IconMenu /></Navigation.Tile>
			{/snippet}
			{#snippet tiles()}
				<Navigation.Tile id="0" label="Files" href={hrefExample}>
					<IconFolder />
				</Navigation.Tile>
				<Navigation.Tile id="1" label="Images" href={hrefExample}>
					<IconImage />
				</Navigation.Tile>
				<Navigation.Tile id="2" label="Music" href={hrefExample}>
					<IconMusic />
				</Navigation.Tile>
				<Navigation.Tile id="3" label="Videos" href={hrefExample}>
					<IconVideo />
				</Navigation.Tile>
			{/snippet}
			{#snippet footer()}
				<Navigation.Tile labelExpanded="Settings" href="/settings" title="settings"
					><IconSettings /></Navigation.Tile
				>
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
			<Navigation.Tile id="0" label="Files">
				<IconFolder />
			</Navigation.Tile>
			<Navigation.Tile id="1" label="Images">
				<IconImage />
			</Navigation.Tile>
			<Navigation.Tile id="2" label="Music">
				<IconMusic />
			</Navigation.Tile>
			<Navigation.Tile id="3" label="Videos">
				<IconVideo />
			</Navigation.Tile>
		</Navigation.Bar>
	</div>
{/if}
