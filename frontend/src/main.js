import App from './App.vue'
import router from './router/router'
/* Set up using Vue 3 */
import { createApp } from 'vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
    faArrowLeft,
    faPaperPlane,
    faTrash,
    faComments,
    faGlobe,
    faLock,
    faLockOpen,
    faPerson,
    faRightToBracket,
    faRightFromBracket,
    faUserPlus,
    faGear,
    faBars,
    faCamera,
    faArrowRightRotate
} from '@fortawesome/free-solid-svg-icons'
import store from './vuex/store'

/* add icons to the library */
library.add(
    faArrowLeft,
    faPaperPlane,
    faTrash,
    faComments,
    faGlobe,
    faLock,
    faLockOpen,
    faPerson,
    faRightToBracket,
    faRightFromBracket,
    faUserPlus,
    faGear,
    faBars,
    faCamera,
    faArrowRightRotate

)

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store);
app.use(router).mount('#app')