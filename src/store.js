import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
    state: {
        options: [],
        activeIndex: '/home/index',
        userInfo: {},
        userMenu: {},
    },
    mutations: {
        // 添加tabs
        addTabs(state, data) {
            this.state.options.push(data);
        },
        // 删除tabs
        deleteTabs(state, route) {
            let index = 0;
            for (let option of state.options) {
                if (option.route === route) {
                    break;
                }
                index++;
            }
            this.state.options.splice(index, 1);
        },
        // 设置当前激活的tab
        setActiveIndex(state, index) {
            this.state.activeIndex = index;
        },
        // 设置详情信息
        saveUserInfo(state, info) {
            this.state.userInfo = info;
        },
        removeUserInfo(state) {
            this.state.userInfo = null;
        },
        saveUserMenu(state, menus) {
            this.state.userMenu = menus;
        },
        removeUserMenu(state) {
            this.state.userMenu = null;
        },
        clearStore(state) {
            this.state.options = [];
            this.userInfo = null;
            this.userMenu = null;
        }
    }
});

export default store;