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

		v[zeroPos[0]][zeroPos[1]] = v[zeroPos[0] - 1][zeroPos[1]];
		v[zeroPos[0] - 1][zeroPos[1]] = 0;
	}
	function handleDown() {
		let zeroPos = findZero();

		v[zeroPos[0]][zeroPos[1]] = v[zeroPos[0] + 1][zeroPos[1]];
		v[zeroPos[0] + 1][zeroPos[1]] = 0;
	}
	function handleLeft() {
		let zeroPos = findZero();
		v[zeroPos[0]][zeroPos[1]] = v[zeroPos[0]][zeroPos[1] - 1];
		v[zeroPos[0]][zeroPos[1] - 1] = 0;
	}
	function handleRight() {
		let zeroPos = findZero();
		if(zeroPos[1]<3){
			v[zeroPos[0]][zeroPos[1]] = v[zeroPos[0]][zeroPos[1] + 1];
			v[zeroPos[0]][zeroPos[1] + 1] = 0;
		}

	}
</script>

<svelte:window on:keydown={handleKeyDown} />

{#each v as row}
	{#each row as num}
		<span class="space">&nbsp;{num}&nbsp;</span>
	{/each}
	<br />
{/each}

<style>
	.space {
		display: inline-block;

		width: 30px; /* Set your desired width here */
	}
</style>
