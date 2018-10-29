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



Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$global = global;
Vue.prototype.$tools = tools;
Vue.prototype.$http = apiAxios;
new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        this.$nextTick(function() {
            window.addEventListener('beforeunload', this.windowRefresh());
        })
    },
    methods: {
        logInfo: function(info) {
            if (config.debug == true) {
                console.log(info)
            }
        },
        windowRefresh: function() {
            //刷新后加载的都是模块 不需要router
            // sessionStorage.removeItem('isAddRouters');
            var domRoute = window.location.hash.substr(1);
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
}).$mount('#home')