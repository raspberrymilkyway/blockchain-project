<template>
    <div id="iotButtons">
        <button @click.prevent="runOne">Run Once</button>
        <button @click.prevent="runFive">Run Five</button>
        <button @click.prevent="runTen">Run Ten</button>
        <button @click.prevent="runFifty">Run Fifty</button>
        <button @click.prevent="runHundred">Run Hundred</button>
    </div>
    <p id="iotOutput"></p>
</template>

<script>
    import { gen } from "/src/scripts/iotHandler"
    
    export default{
        methods:{
            runOne(){
                const x = gen(1)
                let str = "no instances of chemical use recorded"
                if (x.length > 0){
                    str = x[0]["total amount"].toString() + " instance of chemical use recorded"
                }
                document.getElementById("iotOutput").innerText = "Simulator run 1 time: " + str
            },
            runFive(){
                const x = gen(5)
                let str = "no instances of chemical use recorded"
                if (x.length > 0){
                    let sum = x[0]["total amount"]
                    for (let i = 1; i < x.length; i++){
                        sum += x[i]["total amount"]
                    }
                    str = sum.toString() + " instance(s) of chemical use recorded"
                }
                document.getElementById("iotOutput").innerText = "Simulator run 5 times: " + str
            },
            runTen(){
                const x = gen(10)
                let str = "no instances of chemical use recorded"
                if (x.length > 0){
                    let sum = x[0]["total amount"]
                    for (let i = 1; i < x.length; i++){
                        sum += x[i]["total amount"]
                    }
                    str = sum.toString() + " instance(s) of chemical use recorded"
                }
                document.getElementById("iotOutput").innerText = "Simulator run 10 times: " + str
            },
            runFifty(){
                const x = gen(50)
                let str = "no instances of chemical use recorded"
                if (x.length > 0){
                    let sum = x[0]["total amount"]
                    for (let i = 1; i < x.length; i++){
                        sum += x[i]["total amount"]
                    }
                    str = sum.toString() + " instance(s) of chemical use recorded"
                }
                document.getElementById("iotOutput").innerText = "Simulator run 50 times: " + str
            },
            runHundred(){
                const x = gen(100)
                let str = "no instances of chemical use recorded"
                if (x.length > 0){
                    let sum = x[0]["total amount"]
                    for (let i = 1; i < x.length; i++){
                        sum += x[i]["total amount"]
                    }
                    str = sum.toString() + " instance(s) of chemical use recorded"
                }
                document.getElementById("iotOutput").innerText = "Simulator run 100 times: " + str
            }
        }
    }
</script>