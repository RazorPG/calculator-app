import { createApp } from 'vue';
import App from './App.vue';
import './assets/style.css';
import "animate.css/animate.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faDeleteLeft, faDivide, faPlus, faMinus, faCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faXmark, faDeleteLeft, faDivide, faPlus, faMinus, faCircle);

createApp(App).mount('#app')
