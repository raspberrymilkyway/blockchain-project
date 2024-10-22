<!-- ChatGPT generated. Figure out how to do this, lol -->
<template>
    <div>
        <h2>Manual Input</h2>
        <div>
            <input type="text" v-model="input1" placeholder="Fertilizer brand" />
            <input type="text" v-model="input2" placeholder="Location used" />
            <input type="number" v-model="input3" placeholder="Amount of fertilizer used" />
            <input type="number" v-model="input4" placeholder="Number of crops" />
            <input type="text" v-model="input5" placeholder="Type of crop" />
        </div>
        <button @click="handleSubmit">Submit</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: ''
        };
    },
    methods: {
        handleSubmit() {
            const inputs = {
                input1: this.input1,
                input2: this.input2,
                input3: this.input3,
                input4: this.input4,
                input5: this.input5
            };
            console.log(inputs);
        }
    }
};
</script>