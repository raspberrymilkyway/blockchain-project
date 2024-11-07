<!-- Modified from ChatGPT -->
<!-- This didn't need to be a template, but by the time I figured that out, I had it done... -->

<template>
    <div class="hidden-div" id="manual-input">
        <h2>Manual Input</h2>
        <div>
            <label>
                <span>Chemical type: </span>
                <select v-model="chemical">
                    <option value="">Type of chemical used</option>
                    <option value="fertilizer">Fertilizer</option>
                    <option value="fungicide">Fungicide</option>
                    <option value="herbicide">Herbicide</option>
                    <option value="insecticide">Insecticide</option>
                </select><br>
            </label>
            <label>
                <span>Location of use: </span>
                <input type="text" v-model="location" placeholder="Location of use" /><br>
            </label>
            <label>
                <span>Amount used: </span>
                <input type="number" v-model="amount" placeholder="Amount of chemical used" />
            </label>
            <label>
                <span>Number of crops affected: </span>
                <input type="number" v-model="cropCount" placeholder="Number of crops" />
            </label>
            <label>
                <span>Type of crop affected: </span>
                <input type="text" v-model="cropType" placeholder="Type of crop" />
            </label>
            <label>
                <span>Image link: </span>
                <input type="text" v-model="imageLink" placeholder="Image link">
            </label>
        </div>
        <button @click="handleSubmit">Submit</button>
    </div>
</template>

<script>
//I cannot for the life of me figure out how to set this up in a separate file
window.addEventListener("onload", setMetamaskAddress());

async function setMetamaskAddress() { 
  const accounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
  document.getElementById("manual-input").classList.remove("hidden-div");
}


export default {
    data() {
        return {
            chemical: '',
            location: '',
            amount: '',
            cropCount: '',
            cropType: '',
            imageLink: ''
        };
    },
    methods: {
        handleSubmit() {
            const inputs = {
                chemical: this.chemical,
                location: this.location,
                amount: this.amount,
                cropCount: this.cropCount,
                cropType: this.cropType,
                imageLink: this.imageLink
            };

            //there's... probably an easier way to do this
            if (this.chemical.localeCompare("") == 1 &&
                this.location.localeCompare("") == 1 &&
                this.amount > 0 &&
                this.cropCount > 0 &&
                this.cropType.localeCompare("") == 1) {

                //reset textboxes
                this.chemical = '';
                this.location = '';
                this.amount = '';
                this.cropCount = '';
                this.cropType = '';
                this.imageLink = '';
                // console.log(inputs);
                
                const event = new CustomEvent("submit", {"detail": inputs});
                document.dispatchEvent(event);
                return inputs;
            }
            else if (this.chemical.localeCompare("") == 0) {
                console.log("chemical empty");
            }
            else if (this.location.localeCompare("") == 0) {
                console.log("location empty");
            }
            else if (this.amount < 1) {
                console.log("amount too low");
            }
            else if (this.cropCount < 1) {
                console.log("crop count too low");
            }
            else if (this.cropType.localeCompare("") == 0) {
                console.log("crop type empty");
            }
            else if (this.imageLink.localeCompare("") == 0) {
                console.log("image link empty");
            }
            else {
                console.log("empty");
            }
        }
    }
};
</script>