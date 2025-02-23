<script lang="ts">
	// @ts-ignore
	let v: number[][] = $state([
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12],
		[13, 14, 15, 0]
	]);

	function handleKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowUp': {
				handleUp();
				break;
			}
			case 'ArrowDown': {
				handleDown();
				break;
			}
			case 'ArrowLeft': {
				handleLeft();
				break;
			}
			case 'ArrowRight': {
				handleRight();
				break;
			}
		}
	}
	function findZero(): [number, number] {
		for (let rowIndex = 0; rowIndex < v.length; rowIndex++) {
			const row = v[rowIndex];
			for (let colIndex = 0; colIndex < row.length; colIndex++) {
				const num = row[colIndex];
				if (num === 0) {
					return [rowIndex, colIndex];
				}
			}
		}
		return [0, 0];
	}

	function handleUp() {
		let zeroPos = findZero();
		if(zeroPos[0]>0){
		v[zeroPos[0]][zeroPos[1]] = v[zeroPos[0] - 1][zeroPos[1]];
		v[zeroPos[0] - 1][zeroPos[1]] = 0;
		}
	}
	function handleDown() {
		let zeroPos = findZero();
		if(zeroPos[0]<3){
		v[zeroPos[0]][zeroPos[1]] = v[zeroPos[0] + 1][zeroPos[1]];
		v[zeroPos[0] + 1][zeroPos[1]] = 0;
		}
	}
	function handleLeft() {
		let zeroPos = findZero();
		if(zeroPos[1]>0){
		v[zeroPos[0]][zeroPos[1]] = v[zeroPos[0]][zeroPos[1] - 1];
		v[zeroPos[0]][zeroPos[1] - 1] = 0;
		}
	}
	function handleRight() {
		let zeroPos = findZero();
		if(zeroPos[1]<3){
			v[zeroPos[0]][zeroPos[1]] = v[zeroPos[0]][zeroPos[1] + 1];
			v[zeroPos[0]][zeroPos[1] + 1] = 0;
		}

	}
</script>

<div class="flex flex-col items-center justify-center">
	<h1 class="h1">Puzzle</h1>
</div>

<svelte:window on:keydown={handleKeyDown} />


{#each v as row}
<div class="flex flex-row items-center justify-center">
	{#each row as num}
		{#if (num!=0)}
			<button type="button" style="background-color:{'#7b1883'}" class="btn-icon btn-icon-xl variant-filled">&nbsp;{num}&nbsp;</button>
		{:else}
			<button type="button" style="background-color:{'#4d4d4d'}" class="btn-icon btn-icon-xl variant-filled">&nbsp;{num}&nbsp;</button>
		{/if}

		<!-- <span class="space">&nbsp;{num}&nbsp;</span> -->
	{/each}
	<br />

</div>

{/each}

<div class="flex flex-col items-center justify-center auto-rows-auto" >
<label class="flex items-center space-x-2">
<br>
<button class="btn preset-filled-primary-500" onclick={handleUp}>&uarr;</button>
<br>
<button class="btn preset-filled-primary-500" onclick={handleLeft}>&larr;</button>
<button class="btn preset-filled-primary-500" onclick={handleRight}>&rarr;</button>
<br>
<button class="btn preset-filled-primary-500" onclick={handleDown}>&darr;</button>
</div>


<style>
	.space {
		display: inline-block;

		width: 30px; /* Set your desired width here */
	}
	
</style>
