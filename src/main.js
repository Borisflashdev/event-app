import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import BaseButton from './components/ui/BaseButton.vue';
import BaseEvent from './components/ui/BaseEvent.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';

library.add(fas, fab);

const app = createApp(App);
app.component('base-button', BaseButton);
app.component('base-event', BaseEvent);
app.component('base-spinner', BaseSpinner);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');