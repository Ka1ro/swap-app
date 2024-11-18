<script setup>
import HeaderView from '../components/HeaderView.vue';
import MiddleSection from '@/components/MiddleSection.vue';
import ProfileInfo from '@/components/ProfileInfo.vue';
</script>


<template>
  <header>
    <HeaderView />
  </header>
  <body>
    <div class="container-fluid">
      <div class="row">
        <!-- Левая колонна (4 ячейки) -->
         <div class='col-4 bd-light'>
            <ProfileInfo />
         </div>

        <!-- Средняя колонна (6 ячеек) -->
        <div class="col-6 bg-secondary ">
          <p>Средняя колонна, 6 ячеек</p>
          <MiddleSection />
        </div>

        <!-- Правая колонна (2 ячейки) -->
        <div class="col-2 bg-light">
          <p>Правая колонна, 2 ячейки</p>
        </div>
      </div>
    </div>
  </body>
  
</template>

<script>
export default {
  data() {
    
  },
  mounted(){
  },
  methods: {
  },
};
</script>