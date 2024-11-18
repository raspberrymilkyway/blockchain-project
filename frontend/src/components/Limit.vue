<template>
    <div id="limit" class="hidden-div">
        <h2>Set Chemical Limit</h2>
        <div>
            <label>
                <span>Set limits for address: </span>
                <input type="text" v-model="address" placeholder="Wallet address" /><br>
            </label>
            <label>
                <span>Set amount of fertilizer:</span>
                <input type="number" v-model="fertilizerAmt" placeholder="Amount of fertilizer" />
            </label>
            <label>
                <span>Set amount of fungicide:</span>
                <input type="number" v-model="fungicideAmt" placeholder="Amount of fungicide" />
            </label>
            <label>
                <span>Set amount of herbicide:</span>
                <input type="number" v-model="herbicideAmt" placeholder="Amount of herbicide" />
            </label>
            <label>
                <span>Set amount of insecticide:</span>
                <input type="number" v-model="insecticideAmt" placeholder="Amount of insecticide" />
            </label>
        </div>
        <button @click="addLimit">Submit</button>
        <p id="limitOut"></p>
    </div>
</template>

<script>
export default{
    data() {
        return {
            address: '',
            fertilizerAmt: '',
            fungicideAmt: '',
            herbicideAmt: '',
            insecticideAmt: ''
        };
    },
    methods:{
        addLimit(){
            const inputs = {
                address: this.address,
                fertilizerAmt: this.fertilizerAmt,
                fungicideAmt: this.fungicideAmt,
                herbicideAmt: this.herbicideAmt,
                insecticideAmt: this.insecticideAmt
            };
            var limitOut = document.getElementById("limitOut");

            if (this.address.localeCompare("") == 1 &&
                this.fertilizerAmt > -1 &&
                this.fungicideAmt > -1 &&
                this.herbicideAmt > -1 &&
                this.insecticideAmt > -1) {

                //reset textboxes
                this.address = "";
                this.fertilizerAmt = "";
                this.fungicideAmt = "";
                this.herbicideAmt = "";
                this.insecticideAmt = "";
                
                const event = new CustomEvent("limits", {"detail": inputs});
                document.dispatchEvent(event);
                return inputs;
            }
            else if (this.address.localeCompare("") == 0){
                limitOut.innerText = "Address must be given";
            }
            else if (this.fertilizerAmt < 0){
                limitOut.innerText = "Fertilizer amount must be at least 0";
            }
            else if (this.fungicideAmt < 0){
                limitOut.innerText = "Fungicide amount must be at least 0";
            }
            else if (this.herbicideAmt < 0){
                limitOut.innerText = "Herbicide amount must be at least 0";
            }
            else if (this.insecticideAmt < 0){
                limitOut.innerText = "Insecticide amount must be at least 0";
            }
            else{
                limitOut.innerText = "All limit fields must have input.";
            }
        }
    }
}
</script>