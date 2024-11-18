// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/Home.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegistrationForm from '@/views/RegisterForm.vue';
import UserProfilePage from '@/views/UserProfilePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/reg',
    name: "Register",
    component: RegistrationForm
  },
  {
    path: '/profile',
    name: "Profile",
    component: UserProfilePage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
