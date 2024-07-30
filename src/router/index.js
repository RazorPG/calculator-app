import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/components/Layout.vue";
import History from "@/components/History.vue";

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
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
