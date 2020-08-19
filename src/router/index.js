
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "../views/home/home.vue"

Vue.use(VueRouter)


const routes=[
    {path:'/home',
    component:Home}
]

const router=new VueRouter({
    routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router
