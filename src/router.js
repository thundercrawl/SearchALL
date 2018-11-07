import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/importContent',
            name: 'importContent',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/ImportContent.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Search.vue')
        },
        {
            path: '/test',
            name: 'test',
            component: () =>
                import ( /* webpackChunkName: "test" */ './views/test1.vue')
        }
    ]
})