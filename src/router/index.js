// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import AllProduct from '../views/AllProduct.vue'
import Admin from '../views/Admin.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',          // Jika user membuka web.com/
      name: 'beranda',
      component: Home // Tampilkan komponen ini
    },
    {
      path: '/all-product',
      name: 'all-product',
      component: AllProduct
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Admin
    }
  ]
})

export default router