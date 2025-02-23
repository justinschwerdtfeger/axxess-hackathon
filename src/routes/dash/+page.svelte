<p>Dash's route</p>
<script lang="ts">
    import { onMount } from 'svelte';
    let time = 0;
    // @ts-ignore
    let interval;
    let remainingTime = time;
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
        remainingTime = time;
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
    alert("Time's up!"); // Optional: show an alert
  }
    
</script>
<h1>Countdown: {remainingTime}s</h1>
<input type="number" bind:value={time} min="1" on:change={updateTime} />
<button on:click={startTimer}>Start</button>
<button on:click={stopTimer}>Stop</button>
<button on:click={resetTimer}>Reset</button>