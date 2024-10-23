<!-- Modified from ChatGPT -->

<template>
    <div>
        <h2>Manual Input</h2>
        <div>
            <!-- <input type="text" v-model="chemical" placeholder="Type of chemical used" /> -->
            <select v-model="chemical">
                <option value="">Type of chemical used</option>
                <option value="fertilizer">Fertilizer</option>
                <option value="fungicide">Fungicide</option>
                <option value="herbicide">Herbicide</option>
                <option value="insecticide">Insecticide</option>
            </select>
            <input type="text" v-model="location" placeholder="Location of use" />
            <input type="number" v-model="amount" placeholder="Amount of fertilizer used" />
            <input type="number" v-model="cropCount" placeholder="Number of crops" />
            <input type="text" v-model="cropType" placeholder="Type of crop" />
            <input type="text" v-model="imageLink" placeholder="Image link">
        </div>
        <button @click="handleSubmit">Submit</button>
    </div>
</template>

<script>
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
            this.cropType.localeCompare("") == 1){
                this.chemical = '';
                this.location = '';
                this.amount = '';
                this.cropCount = '';
                this.cropType = '';
                this.imageLink = '';
                console.log(inputs);
                return inputs;
            }
            else if (this.chemical.localeCompare("") == 0){
                console.log("chemical empty");
            }
            else if (this.location.localeCompare("") == 0){
                console.log("location empty");
            }
            else if (this.amount < 1){
                console.log("amount too low");
            }
            else if (this.cropCount < 1){
                console.log("crop count too low");
            }
            else if (this.cropType.localeCompare("") == 0){
                console.log("crop type empty");
            }
            else if (this.imageLink.localeCompare("") == 0){
                console.log("image link empty");
            }
            else{
                console.log("empty");
            }
        }
    }
};
</script>