<p>Tyler's route</p>
<script>
    let cardioCheck = $state(false);
</script>
<h1>Welcome to the exercise trainer!</h1>
<label>
To get started, select the types of exercises you would like to do:<br>
Cardio <input type="checkbox" bind:checked={cardioCheck}/>
{cardioCheck}
</label>