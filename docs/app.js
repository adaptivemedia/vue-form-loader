import Vue from 'vue';
import App from './App.vue';
import FormLoader  from "../src/index";
Vue.use(FormLoader);

new Vue({
    el: '#app',
    render: h => h(App),
    mounted() {
        FormLoader.autoBindToForms();
    }
});
