<p>Luke's route</p>
<script lang="ts">
    import { prescriptions } from './stores';
    import { get } from 'svelte/store';

    let pills = '';
    let perDay = '';
    let hoursBetween = '';

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

<ul>
    {#each $prescriptions as prescription, index}
        <li>
            <label>
                Number of pills:
                <input type="number" bind:value={prescription.pills} on:input={(e) => updatePills(index, e.target.value)}>
            </label>
            <br>
            Pills per day: {prescription.perDay}
            <br>
            Hours between pills: {prescription.hoursBetween}
        </li>
    {/each}
</ul>

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
