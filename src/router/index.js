// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import AllProduct from '../views/AllProduct.vue'
import Admin from '../views/Admin.vue'
import AboutUs from '../views/AboutUs.vue'
import DetailProduct from '../views/DetailProduct.vue'

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
      path: '/all-product/:slug',
      name: 'detail-produk',
      component: DetailProduct
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Admin
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUs
    }
  ]
})

export default router