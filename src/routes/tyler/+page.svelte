<p>Tyler's route</p>
<script lang="ts">
	import { goto } from '$app/navigation';

    let setupStage = $state(0);
    let exerciseTypeNames = $state(["Cardio","Strength Training","Flexibility","Balance"]);
    let exerciseSubNames = $state([["Mountain climbers","Squat jumps","High knees"],["Push-Ups","Pull-Ups","Lunges"],["Quad stretch","Leg stretches","Knee to chest"],["Squats","Plank","Single-leg stands"]])
    let exerciseTypeEnabled = $state([false,false,false,false]);
    let exerciseSubEnabled = $state([[true,true,true],[true,true,true],[true,true,true],[true,true,true]])
    let minutesPerDay = $state(15);

    let numberOfExercises = 0
    function findNumberOfExercises(){
        
    }


    function increment() {
        resetTimer()
        startTimer()
		setupStage++;
	}
    function decrement() {
		setupStage--;
	}
    function setupStart() {
		setupStage = 0;
	}
    function goToHome() {
		setupStage = 2;
	}

    import { onMount } from 'svelte';
    // @ts-ignore
    let interval;
    let remainingTime = $state(minutesPerDay*60);
    let remainingExercise = $state((minutesPerDay*60));
    let alarm: HTMLAudioElement;

onMount(() => {
    alarm = new Audio("beep.mp3");
    alarm.onerror = () => {
        console.error("Failed to load audio file.");
    };
});
    function startTimer(){
        // @ts-ignore
        if(!interval && remainingTime > 0) {
            interval = setInterval(() => {
                if(remainingTime > 0){
                    // @ts-ignore
                    remainingTime -= 1;
                }else{
                    // @ts-ignore
                    clearInterval(interval);
                    if(alarm){
                        playAlarm();
                    }
                interval = null;
            }
        }, 1000)
            }
        }
    // @ts-ignore
    function resetTimer() {
        // @ts-ignore
        stopTimer();
        remainingTime = minutesPerDay*60;
    }
    // @ts-ignore
    function updateTime(event){
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

{:else if setupStage==3}

<h1>Total Exercise: {Math.floor(remainingTime)}s</h1>
<h1>Current Exercise: {Math.floor(remainingTime)}s</h1>
<!-- <button onclick={startTimer}>Start</button>
<button onclick={stopTimer}>Stop</button>
<button onclick={resetTimer}>Reset</button> -->
<br>
<button onclick={goToHome} style="background-color:{"#c51f23"}">
	Back
</button>

{:else}


<button onclick={increment} style="background-color:{"#39c41f"}">
	Start Exercise!
</button>
<br>
<br>

<button onclick={setupStart} style="background-color:{"#cfcfcf"}">
	Adjust exercises
</button>

{/if}
