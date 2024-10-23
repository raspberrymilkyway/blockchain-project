import './assets/main.css'
import './assets/nav.css'

import { createApp } from 'vue'
import History from './History.vue'
import Add from "./Add.vue"
import Info from './Info.vue'

createApp(History).mount('#history')
createApp(Add).mount("#add")
createApp(Info).mount("#about")
