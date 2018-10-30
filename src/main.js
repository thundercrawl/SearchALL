import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import global from './global';
import tools from './tools';
import apiAxios from './axios';
import config from './config';
/*module dependency*/
import ElementUI from 'element-ui';
import VueCookie from "vue-cookie";



Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueCookie)
Vue.prototype.$global = global;
Vue.prototype.$tools = tools;
Vue.prototype.$http = apiAxios;



/*register components*/
import button from '@/components/buttons/button.vue';

Vue.component(button.name, button);




/*init instance*/
new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        this.$global.logInfo(localStorage.loginStatus)
        if (localStorage.loginStatus == null) {
            this.$global.logInfo("set login status in client, when first/or fresh")
            localStorage.loginStatus = false;

        }
        this.$nextTick(function() {
            window.addEventListener('beforeunload', this.windowRefresh());
        })
    },
    methods: {

        windowRefresh: function() {
            //刷新后加载的都是模块 不需要router
            // sessionStorage.removeItem('isAddRouters');
            var domRoute = window.location.hash.substr(1);

            this.$global.logInfo("load session storage when refresh")
            this.$global.logInfo(sessionStorage)
                //为什么刷新后这里的this.$route.path始终是"/"呢，所以先用dom方法判断
            if (domRoute === "/" || domRoute === "/login") {
                this.$cookie.set('userName', "", -1);
                // this.$cookie.get('userInfo', "", -1);
                // this.$cookie.get('userMenu', "", -1);

                sessionStorage.removeItem('userInfo');
                sessionStorage.removeItem('userMenu');
            }
            if (domRoute !== "/" && domRoute !== "/login") {
                // let userInfo = this.$cookie.get('userInfo');
                // let userMenu = this.$cookie.get('userMenu');
                let userInfo = sessionStorage.getItem('userInfo');
                let userMenu = sessionStorage.getItem('userMenu');
                this.$store.commit("saveUserInfo", JSON.parse(userInfo));
                this.$store.commit("saveUserMenu", JSON.parse(userMenu));
                this.$store.commit('setActiveIndex', '/home/index');
                this.$router.push('/home/index');
            }
        }
    }
}).$mount('#app')