import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import SignFormView from '../views/user/SignFormView.vue'
import LoginView from '../views/user/LoginView.vue'
import UpdateForm from '../views/user/UpdateForm.vue'
import LogoutView from '../views/user/LogoutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: DashboardView
  },
  {
    path: '/sign',
    name: 'sign',
    component: SignFormView
  },
  {
    path: '/setting',
    name: 'setting',
    component: UpdateForm
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
