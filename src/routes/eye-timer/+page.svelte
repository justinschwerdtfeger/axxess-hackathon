<script lang="ts">
	import { onMount } from 'svelte';
	import { Switch } from '@skeletonlabs/skeleton-svelte';
	let time = 0;
	let tempTime = 0;
	let interval: ReturnType<typeof setInterval> | null = null;
	let remainingTime = 0;
	let alarm: HTMLAudioElement;
	let checking = false;
	// let state = $state(false);
	onMount(() => {
		alarm = new Audio('beep.mp3');
		alarm.onerror = () => {
			console.error('Failed to load audio file.');
		};
	});
	function startTimer() {
		// Ensure remainingTime is set if it's 0 but tempTime is provided
		if (remainingTime === 0 && tempTime > 0) {
			remainingTime = tempTime;
		}

		// Prevent multiple intervals from being created

		if (!interval && remainingTime > 0) {
			checking = true;
			interval = setInterval(() => {
				if (remainingTime > 0) {
					remainingTime -= 1;
				} else {
					// @ts-ignore
					clearInterval(interval);
					interval = null;
					checking = false;
					if (alarm) {
						playAlarm();
					}
				}
			}, 1000);
		} else {
			if (checking) {
				remainingTime = tempTime;
			}
		}
	}
	function add() {
		remainingTime += tempTime;
	}
	function add15s() {
		// @ts-ignore
		remainingTime += 15;
	}
	function add15m() {
		// @ts-ignore
		remainingTime += 900;
	}
	function add1h() {
		// @ts-ignore
		remainingTime += 3600;
	}
	// @ts-ignore
	function resetTimer() {
		// @ts-ignore
		stopTimer();
		remainingTime = 0;
		checking = false;
	}
	// @ts-ignore
	function updateTime(event) {
		// @ts-ignore
		time = parseInt(event.target.value) || 0;
		// @ts-ignore
		// resetTimer();
	}
	function stopTimer() {
		// @ts-ignore
		clearInterval(interval);
		interval = null;
	}
	function playAlarm() {
		alarm.play();
		alert("Time to rest your eyes and take a break!"); // Optional: show an alert
	}
	function formatTime(seconds: number) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const sec = seconds % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
	}
</script>

<br />
<br />
<br />
<br />
<br />
<div class="flex flex-col items-center justify-center">
	<h1 class="h1">Countdown</h1>
	<h1 class="h1">{formatTime(remainingTime)}</h1>

	<!-- <input class="text-black" type="number" bind:value={tempTime} min="1" on:change={updateTime} /> -->

	<label class="label max-w-sm">
		<span class="label-text"></span>
		<input class="input" type="number" bind:value={tempTime} min="1" onchange={updateTime} />
	</label>

	<br />
	<div class="flex flex-row items-center justify-center">
		<button class="btn preset-filled-success-500" onclick={startTimer}>Start</button>
		<button class="btn preset-filled-error-500" onclick={stopTimer}>Stop</button>
		<button class="btn preset-filled-primary-500" onclick={resetTimer}>Reset</button>
		<button class="btn preset-tonal-success" onclick={add}>Add</button>
	</div>
	<br />
	<div class="flex flex-row items-center justify-center">
		<button class="btn preset-outlined-surface-500" onclick={add15s}>15s</button>
		<button class="btn preset-outlined-surface-500" onclick={add15m}>15m</button>
		<div style="display: flex; flex-direction: column;">
			<button class="btn preset-outlined-surface-500" onclick={add1h}>1h</button>
		</div>
	</div>
	<br />
	<!-- <div class="flex flex-row items-center justify-center">
		<h1 >Break Toggle</h1>
		<Switch name="example" bind:checked={state} onCheckedChange={console.log} />
	</div> -->
</div>
