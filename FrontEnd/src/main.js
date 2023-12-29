import { VueElement, createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import {useExamStore} from './store/exam'
import {useQuestionStore} from './store/question'

 import { library } from '@fortawesome/fontawesome-svg-core'
 import {fas} from '@fortawesome/free-solid-svg-icons'
 import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 library.add(fas)

 const pinia = createPinia()
 const app = createApp(App)

 app.component('font-awesome-icon',FontAwesomeIcon)

 
 app.use(pinia).use(router).mount('#app')

 const examStore = useExamStore();
 const questionStore = useQuestionStore();

