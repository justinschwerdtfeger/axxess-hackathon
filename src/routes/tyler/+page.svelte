<p>Tyler's route</p>
<script>
    let setupStage = $state(0);
    let exerciseTypeNames = $state(["Cardio","Strength Training","Flexibility","Balance"]);
    let exerciseSubNames = $state([["Running","Cycling","Swimming"],["Weightlifting","Bodyweight exercises"],["Yoga","Pilates","Static stretching"],["Standing on one leg","Heel raises","Chair sit-to-stand"]])
    let exerciseTypeEnabled = $state([false,false,false,false]);
    let exerciseSubEnabled = $state([[true,true,true],[true,true],[true,true,true],[true,true,true]])
    let minutesPerDay = $state(15);

    function increment() {
		setupStage++;
	}
    function decrement() {
		setupStage--;
	}

</script>
<h1>Welcome to the exercise trainer!</h1>

{#if setupStage==0}
To get started, select the types of exercises you would like to do:<br>

{#each exerciseTypeNames as exerciseType, i}

<label>
    <input
        type="checkbox"
        bind:checked={exerciseTypeEnabled[i]}
    />

    {exerciseType}
    <!-- {exerciseTypeEnabled[i]} -->
    <br>
</label>

{#if exerciseTypeEnabled[i]}
{#each exerciseSubEnabled[i] as exerciseSubType, v}
    <label>
        &nbsp;-&nbsp;
        <input
            type="checkbox"
            bind:checked={exerciseSubEnabled[i][v]}
        />
        {exerciseSubNames[i][v]}
        <!-- {exerciseSubEnabled[i][v]} -->
        <br>
    </label>

{/each}
{/if}   
{/each}

<button onclick={increment} style="background-color:{"#39c41f"}">
	Next
</button>

{:else if setupStage==1}
Enter how many minutes you would like to spend each day exercising:<br>
<input
type="number"
style="background-color:{"#cfcfcf"}"
bind:value={minutesPerDay}
>
<br>
<button onclick={decrement} style="background-color:{"#c51f23"}">
	Back
</button>

<button onclick={increment} style="background-color:{"#39c41f"}">
	Let's go!
</button>

{/if}
