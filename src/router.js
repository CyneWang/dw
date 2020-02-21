import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect:'/login',
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('./views/Home.vue'),
            children:[
                { path:'service/disability/a' , name:'disabiltyA' , component:()=>import('./views/Service/Disability')},
                { path:'service/ability' , name:'ability' , component:()=>import('./views/Service/Ability')},
                { path:'service/abilityCompareA' , name:'abilityCompareA' , component:()=>import('./views/Service/abilityCompareA')},
                { path:'service/abilityCompareB' , name:'abilityCompareB' , component:()=>import('./views/Service/abilityCompareB')},
                { path:'service/abilityCompareC' , name:'abilityCompareC' , component:()=>import('./views/Service/abilityCompareC')},
                { path:'report/budgetAdjust' , name:'budgetAdjust' , component:()=>import('./views/Report/BudgetAdjust')},
                { path:'construction' , name:'construction' , component:()=>import('./views/Construction')},
            ],
        },
    ]
})
