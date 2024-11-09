import './assets/main.css'
import './assets/nav.css'
import './assets/history.css'
import './assets/add.css'
import './web3Handler'

import { createApp } from 'vue'
import Auto from './Auto.vue'
import History from './components/History.vue'

createApp(Auto).mount("#iot")
createApp(History).mount("#history")