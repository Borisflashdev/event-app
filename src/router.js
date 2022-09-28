import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './components/pages/HomePage.vue';
import AboutUs from './components/pages/AboutUs.vue';
import CalendarPage from './components/pages/CalendarPage.vue';
import NotFound from './components/pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home', props: true },
        { path: '/home', component: HomePage, props: true },
        { path: '/Aboutus', component: AboutUs, props: true },
        { path: '/Calendar', component: CalendarPage, props: true },
        { path: '/:notFound(.*)', component: NotFound },
    ],
    scrollBehavior() {
        return { left: 0, top: 0 };
    }  
});

export default router;