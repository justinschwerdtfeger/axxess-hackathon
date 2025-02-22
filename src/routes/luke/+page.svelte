<p>Luke's route</p>
<script lang="ts">
    let prescriptions = [];
    let pills = '';
    let perDay = '';
    let hoursBetween = '';

    function addPrescription() {
        if (pills && perDay && hoursBetween) {
            prescriptions.push({ pills, perDay, hoursBetween });
            pills = '';
            perDay = '';
            hoursBetween = '';
        } else {
            alert('Please fill in all fields!');
        }
    }



</script>

