<script lang="ts">
	import { goto } from '$app/navigation';

	let setupStage = $state(0);
	let exerciseTypeNames = $state(['Cardio', 'Strength Training', 'Flexibility', 'Balance']);
	let exerciseSubNames = $state([
		['Mountain climbers', 'Squat jumps', 'High knees'],
		['Push-Ups', 'Pull-Ups', 'Lunges'],
		['Quad stretch', 'Leg stretches', 'Knee to chest'],
		['Squats', 'Plank', 'Single-leg stands']
	]);
	let exerciseTypeEnabled = $state([false, false, false, false]);
	let exerciseSubEnabled = $state([
		[true, true, true],
		[true, true, true],
		[true, true, true],
		[true, true, true]
	]);
	let minutesPerDay = $state(15);

	let numberOfExercises = 0;
	let currentExerciseNumber = $state(0);
	let currentExercise = $state("");
	function findNumberOfExercises() {
		numberOfExercises = 0;
		for (let i = 0; i < exerciseTypeEnabled.length; i++) {
			if (exerciseTypeEnabled[i]) {
				for (let v = 0; v < exerciseSubEnabled[i].length; v++) {
					if (exerciseSubEnabled[i][v]) {
						numberOfExercises++;
					}
				}
			}
		}
	}

	function findCurrentExercise() {
		let count = 0;
		for (let i = 0; i < exerciseTypeEnabled.length; i++) {
			if (exerciseTypeEnabled[i]) {
				for (let v = 0; v < exerciseSubEnabled[i].length; v++) {
					if (exerciseSubEnabled[i][v]) {
						if (count == currentExerciseNumber) {
							currentExercise = exerciseSubNames[i][v];
							currentExerciseNumber++;
							return;
						} else {
							count++;
						}
					}
				}
			}
		}
		currentExerciseNumber++;
	}

	function increment() {
		setupStage++;
	}
	function decrement() {
		setupStage--;
	}
	function setupStart() {
		setupStage = 0;
	}
	function goToHome() {
		stopTimer();
		currentExerciseNumber = 0;
		resetExerciseTimer();
		setupStage = 2;
	}

	function startGame() {
		findNumberOfExercises();
		findCurrentExercise();
		resetTimer();
		startTimer();
		setupStage++;
	}

	import { onMount } from 'svelte';
	// @ts-ignore
	let interval;
	let remainingTime = $state(minutesPerDay * 60);
	let remainingExerciseTime = $state(minutesPerDay * 60);
	let alarm: HTMLAudioElement;

	onMount(() => {
		alarm = new Audio('beep.mp3');
		alarm.onerror = () => {
			console.error('Failed to load audio file.');
		};
	});
	function startTimer() {
		// @ts-ignore
		if (!interval && remainingTime > 0) {
			interval = setInterval(() => {
				if (remainingTime > 0) {
					// @ts-ignore
					remainingTime -= 1;
					remainingExerciseTime -= 1;
					if (remainingExerciseTime < 1) {
						findCurrentExercise();
						resetExerciseTimer();
						if (alarm) {
						playAlarm();
						}
					}
				} else {
					// @ts-ignore
					clearInterval(interval);
					if (alarm) {
						playAlarm();
					}
					interval = null;
					resetTimer();
					stopTimer();
				}
			}, 1000);
		}
	}
	// @ts-ignore
	function resetTimer() {
		// @ts-ignore
		stopTimer();
		remainingTime = minutesPerDay * 60;
		remainingExerciseTime = (minutesPerDay * 60)/numberOfExercises;
	}
	function resetExerciseTimer(){
		remainingExerciseTime = (minutesPerDay * 60)/numberOfExercises;
	}
	// @ts-ignore
	function updateTime(event) {
		// @ts-ignore
		time = parseInt(event.target.value) || 0;
		// @ts-ignore
		resetTimer();
	}
	function stopTimer() {
		// @ts-ignore
		clearInterval(interval);
		interval = null;
	}
	function playAlarm() {
		alarm.play();
		// alert("Time's up!"); // Optional: show an alert
	}
</script>

<!-- <h1>Welcome to the exercise trainer!</h1> -->
<h1 class="h1 items-center flex flex-col">Physical Trainer</h1>
<div class="flex flex-col items-center justify-center auto-rows-auto" >

{#if setupStage == 0}
	To get started, select the types of exercises you would like to do:<br />
	<label class="left-justify">
	{#each exerciseTypeNames as exerciseType, i}
		<label>
			<input type="checkbox" bind:checked={exerciseTypeEnabled[i]} />

			{exerciseType}
			<!-- {exerciseTypeEnabled[i]} -->
			<br />
		</label>

		{#if exerciseTypeEnabled[i]}
			{#each exerciseSubEnabled[i] as exerciseSubType, v}
				<label>
					&nbsp;-&nbsp;
					<input type="checkbox" bind:checked={exerciseSubEnabled[i][v]} />
					{exerciseSubNames[i][v]}
					<!-- {exerciseSubEnabled[i][v]} -->
					<br />
				</label>
			{/each}
		{/if}
	{/each}
	</label>

	<button onclick={increment} style="background-color:{'#39c41f'}"> Next </button>
{:else if setupStage == 1}
	Enter how many minutes you would like to spend each day exercising:<br />
	<input type="number" style="background-color:{'#4a4a4a'}" bind:value={minutesPerDay} />
	<br />
	<button onclick={decrement} style="background-color:{'#c51f23'}"> Back </button>

	<button onclick={increment} style="background-color:{'#39c41f'}"> Let's go! </button>
{:else if setupStage == 3}
	<h1>Workout Time: {Math.floor(remainingTime)}s</h1>
	<h1>Exercise Time: {Math.floor(remainingExerciseTime)}s</h1>
	<h1>Current Exercise: {currentExercise}</h1>
	<!-- <button onclick={startTimer}>Start</button>
<button onclick={stopTimer}>Stop</button>
<button onclick={resetTimer}>Reset</button> -->
	<br />
	<button onclick={goToHome} style="background-color:{'#c51f23'}"> Back </button>
{:else}
	<button onclick={startGame} style="background-color:{'#39c41f'}"> Start Exercise! </button>
	<br />
	<br />

	<button onclick={setupStart} style="background-color:{'#4a4a4a'}"> Adjust exercises </button>
{/if}

</div>
