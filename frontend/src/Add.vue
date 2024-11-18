<script setup>
import Chemical from './components/Chemical.vue'
import HelloMetamask from './components/HelloMetamask.vue';
import Limit from "./components/Limit.vue"
</script>

<template>  
    <main>
        <h1>Add Chemical</h1>
        <hello-metamask/>
        <Limit />
        <Chemical />
        <p id="addOutput"></p>
    </main>
  </template>