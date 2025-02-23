<p>Tyler's route</p>
<script>
    let cardioCheck = $state(false);
    let exerciseTypeNames = $state(["Cardio","Strength Training","Flexibility","Balance"]);
    let exerciseSubNames = $state([["Running","Cycling","Swimming"],["Weightlifting","Bodyweight exercises"],["Yoga","Pilates","Static stretching"],["Standing on one leg","Heel raises","Chair sit-to-stand"]])
    let exerciseTypeEnabled = $state([false,false,false,false]);
    let exerciseSubEnabled = $state([[false,false,false],[false,false],[false,false,false],[false,false,false]])

</script>
<h1>Welcome to the exercise trainer!</h1>
<label>
To get started, select the types of exercises you would like to do:<br>

{#each exerciseTypeNames as exerciseType, i}

<label>
    <input
        type="checkbox"
        bind:checked={exerciseTypeEnabled[i]}
    />

    {exerciseType}
    {exerciseTypeEnabled[i]}
    <br>
</label>

{/each}


</label>