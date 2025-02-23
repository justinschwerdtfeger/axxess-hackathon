<p>Luke's route</p>
<script lang="ts">
    import { prescriptions } from './stores';
    import { get } from 'svelte/store';

    let pills = '';
    let perDay = '';
    let hoursBetween = '';
    let selectedPrescriptionIndex = 0;

    function addPrescription() {
        if (pills && perDay && hoursBetween) {
            prescriptions.update(prescriptions => {
                prescriptions.push({ pills: Number(pills), perDay: Number(perDay), hoursBetween: Number(hoursBetween) });
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
        prescriptions.update(prescriptions => {
            prescriptions[index].pills = Number(value);
            return prescriptions;
        });
    }
</script>

<form on:submit|preventDefault={addPrescription}>
    <label>
        Number of pills:
        <input type="number" bind:value={pills} required>
    </label>
    <br>
    <label>
        Pills per day:
        <input type="number" bind:value={perDay} required>
    </label>
    <br>
    <label>
        Hours between pills:
        <input type="number" bind:value={hoursBetween} required>
    </label>
    <br>
    <button type="submit">Add new prescription</button>
</form>

<label>
    Select a prescription:
    <select bind:value={selectedPrescriptionIndex}>
        {#each $prescriptions as _, index}
            <option value={index}>Prescription {index + 1}</option>
        {/each}
    </select>
</label>

{#if $prescriptions.length > 0}
    <div>
        <h3>Selected Prescription</h3>
        <label>
            Number of pills:
            <input type="number" bind:value={$prescriptions[selectedPrescriptionIndex].pills} on:input={(e) => updatePills(selectedPrescriptionIndex, e.target.value)}>
        </label>
        <br>
        Pills per day: {$prescriptions[selectedPrescriptionIndex].perDay}
        <br>
        Hours between pills: {$prescriptions[selectedPrescriptionIndex].hoursBetween}
    </div>
{/if}

<style>
    button {
        font-size: 1em;
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
