
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

import router from './router';
import App from './App.vue';

/* font */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
    faTimes,
    faSpinner,
    faCheck,
    faUser,
    faKey,
    faTrash,
    faPlus,
    faLock,
    faHeart,
    faMobileAlt,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faClock, faLightbulb, faCheckCircle } from '@fortawesome/free-regular-svg-icons'

library.add(faTimes, faSpinner, faCheck, faUser, faKey, faTrash, faPlus, faLock, faHeart, faMobileAlt, faExclamationTriangle)
library.add(faGithub)
library.add(faClock, faLightbulb, faCheckCircle)

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Components
Vue.component("LoadingButton", () => import('./components/Auth/LoadingButton.vue'))
Vue.component('Fa', FontAwesomeIcon)

const app = new Vue({
    router,
    el: '#app',
    render: h => h(App)
});

// const app = new Vue();
// app.config.globalProperties.$axios = Axios;
// app.use(router);
// app.mount('#app');