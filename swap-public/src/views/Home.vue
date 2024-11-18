<script setup>
import HeaderView from '../components/HeaderView.vue';
import MiddleSection from '@/components/MiddleSection.vue';
</script>

<template>
  <header>
    <HeaderView />
  </header>
    <h1>My Home</h1>
    <div class="container">
    <h1 class="text-center">Hello, Bootstrap in Vue 3!</h1>
    <MiddleSection />
    <button class="btn btn-primary">Click Me</button>
  </div>
</template>
