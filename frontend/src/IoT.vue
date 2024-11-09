<template>
    <button @click.prevent="runOne">Run Once</button>
    <button @click.prevent="runFive">Run Five</button>
    <button @click.prevent="runTen">Run Ten</button>
    <button @click.prevent="runFifty">Run Fifty</button>
</template>

<script>
    import { gen } from "/src/scripts/iot_handler"
    
    export default{
        methods:{
            runOne(){
                return gen(1)
            },
            runFive(){
                return gen(5)
            },
            runTen(){
                return gen(10)
            },
            runFifty(){
                return gen(50)
            },
        }
    }
</script>