import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import LangFlag from 'vue-lang-code-flags'
Vue.component('lang-flag', LangFlag)

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faStar, faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faStar, faMagnifyingGlass, faArrowRight, faArrowDown)


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')