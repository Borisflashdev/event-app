import { createRouter, createWebHistory } from 'vue-router';
import store from './index.js';

import HomePage from './pages/HomePage.vue';
import AboutUs from './pages/AboutUs.vue';
import CalendarPage from './pages/CalendarPage.vue';
import NotFound from './pages/NotFound.vue';
import LoginPage from './pages/LoginPage.vue';
import SignUpPage from './pages/SignUpPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home', props: true },
        { path: '/home', component: HomePage, props: true },
        { path: '/Aboutus', component: AboutUs, props: true },
        { path: '/Calendar', component: CalendarPage, props: true, meta: { requiresAuth: true } },
        { path: '/login', component: LoginPage, props: true, meta: { requiresUnauth: true } },
        { path: '/signup', component: SignUpPage, props: true, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound },
    ],
    scrollBehavior() {
        return { left: 0, top: 0 };
    }  
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/signup');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/home')
    } else {
        next();
    }
});

export default router;