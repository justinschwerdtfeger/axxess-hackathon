<script lang="ts">
	import { prescriptions } from './stores';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	let pills = '';
	let perDay = '';
	let hoursBetween = '';
	let selectedPrescriptionIndex = 0;
	let success: HTMLAudioElement;
	let alarm: HTMLAudioElement;
	let remainingTime = 0;
	let timerInterval: ReturnType<typeof setInterval>;

	onMount(() => {
		success = new Audio('ding.mp3');
		success.onerror = () => {
			console.error('Failed to load audio file.');
		};
		alarm = new Audio('beep.mp3');
		alarm.onerror = () => {
			console.error('Failed to load audio file.');
		};
	});

	function addPrescription() {
		if (pills && perDay && hoursBetween) {
			prescriptions.update((prescriptions) => {
				prescriptions.push({
					pills: Number(pills),
					perDay: Number(perDay),
					hoursBetween: Number(hoursBetween)
				});
				return prescriptions;
			});
			pills = '';
			perDay = '';
			hoursBetween = '';
		} else {
			alert('Please fill in all fields!');
		}
	}

	function updatePills(index: number, value: string) {
		prescriptions.update((prescriptions) => {
			prescriptions[index].pills = Number(value);
			return prescriptions;
		});
	}

	function takePill(index: number) {
		prescriptions.update((prescriptions) => {
			if (prescriptions[index].pills > 0) {
				prescriptions[index].pills -= 1;
				setTimer(prescriptions[index]);
			}
			return prescriptions;
		});
	}

	function removePrescription(index: number) {
		prescriptions.update((prescriptions) => prescriptions.filter((_, i) => i !== index));
	}

	function setTimer(prescription: { pills: number; perDay: number; hoursBetween: number }) {
		const milliseconds = prescription.hoursBetween * 60 * 60 * 1000;
		remainingTime = milliseconds;

		if (timerInterval) {
			clearInterval(timerInterval);
		}

		timerInterval = setInterval(() => {
			remainingTime -= 1000;
			if (remainingTime <= 0) {
				clearInterval(timerInterval);
				if (alarm) {
					alarm.play();
				}
				alert(
					`Time to take your next pill for prescription with ${prescription.pills} pills, ${prescription.perDay} per day, ${prescription.hoursBetween} hours between.`
				);
			}
		}, 1000);
	}

	function formatTime(ms: number) {
		const totalSeconds = Math.floor(ms / 1000);
		const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
		const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
		const seconds = String(totalSeconds % 60).padStart(2, '0');
		return `${hours}:${minutes}:${seconds}`;
	}

	$: {
		if (
			$prescriptions[selectedPrescriptionIndex] &&
			$prescriptions[selectedPrescriptionIndex].pills === 0
		) {
			removePrescription(selectedPrescriptionIndex);
			success.play();
		}
	}
</script>
<br />
<br />
<br />
<h1 class="h1 items-center flex flex-col">Prescription Tracker</h1>
<div class="flex flex-col items-center justify-center auto-rows-auto" >
	<form on:submit|preventDefault={addPrescription}>
		<label>
			Number of pills:
			<input class="input" type="number" bind:value={pills} required />
		</label>

		<label>
			Pills per day:
			<input class="input" type="number" bind:value={perDay} required />
		</label>
	
		<label>
			Hours between pills:
			<input class = "input" type="number" bind:value={hoursBetween} required />
		</label>
		<button type="submit" 
            class="btn preset-filled-primary-500">
                Add new prescription </button>
	
	{#if $prescriptions.length > 0}
		<button
			type="button"
			class="btn preset-filled-error-500"
			on:click={() => removePrescription(selectedPrescriptionIndex)}
		>
			Remove selected prescription
		</button>
	{/if}
	{#if $prescriptions.length > 0}
		<button
			type="button"
			class="btn preset-filled-primary-500"
			on:click={() => takePill(selectedPrescriptionIndex)}
		>Taken pill
		</button>
	{/if}
</div>
<div class = "flex flex-col items-center justify-center auto-rows-auto">
	{#if $prescriptions.length === 0}
		<p>No prescriptions added yet.</p>
	{/if}
	{#if $prescriptions.length > 0}
	<label>
		Select a prescription:
		<select bind:value={selectedPrescriptionIndex}>
			{#each $prescriptions as _, index}
				<option value={index}>Prescription {index + 1}</option>
			{/each}
		</select>
	</label>
	{/if}
</div>
	{#if $prescriptions.length > 0}
		<div class = "flex flex-row items-center justify-center auto-rows-auto">
			<br />
			Number of pills: {$prescriptions[selectedPrescriptionIndex].pills}
			<br />
			Pills per day: {$prescriptions[selectedPrescriptionIndex].perDay}
			<br />
			Hours between pills: {$prescriptions[selectedPrescriptionIndex].hoursBetween}
		</div>
	{/if}

	{#if remainingTime > 0 && $prescriptions.length > 0}
		<div>
			<h3>Time until next pill: {formatTime(remainingTime)}</h3>
		</div>
	{/if}


<style>
	button {
		font-size: 1em;
		margin-top: 0.5em;
	}

	form {
		margin-bottom: 1em;
	}

	label {
		display: block;
		margin-bottom: 0.5em;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		margin-bottom: 1em;
	}

</style>
