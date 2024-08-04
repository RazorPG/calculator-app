import { createRouter, createWebHistory } from "vue-router";
import Calculator from "@/view/Calculator.vue";
import History from "@/view/History.vue";

const routes = [
    {
        path: '/',
        name: 'Calculator',
        component: Calculator,
    },
    {
        path: '/history',
        name: 'History',
        component: History,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
