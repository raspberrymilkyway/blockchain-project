import './assets/main.css'
import './assets/nav.css'
import './assets/add.css'
import './assets/history.css'
import './web3Handler'
import { fertilize, pesticide, setLimits } from "./web3Handler"

import { createApp } from 'vue'
import History from './components/History.vue'
import Add from "./Add.vue"

createApp(History).mount('#history')
createApp(Add).mount("#add")

//This has to be here unless I want extra weird imports in other files.
// Better design might be to take this and put it in a completely separate file altogether with the needed imports,
// then handle it there and import the result to here... Alas.
document.addEventListener("submit", function(e){
    if (e.detail.chemical == "fertilizer"){
        fertilize(e.detail.location, e.detail.amount, e.detail.cropCount, e.detail.cropType, e.detail.imageLink);
    }
    else{
        pesticide(e.detail.chemical, e.detail.location, e.detail.amount, e.detail.cropCount, e.detail.cropType, e.detail.imageLink);
    }
})

document.addEventListener("limits", function(e){
    console.log('limit event')
    setLimits(e.detail.address, e.detail.fertilizerAmt, e.detail.fungicideAmt, e.detail.herbicideAmt, e.detail.insecticideAmt);
})