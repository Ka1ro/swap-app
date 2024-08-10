<script>
  export default {
    data() {
      return {
        items: [] // Здесь будут храниться полученные данные
      };
    },
    mounted() {
      this.fetchData(); // Вызываем метод получения данных при монтировании компонента
    },
    methods: {
      async fetchData() {
        try {
          const response = await fetch('/items/show-all/money'); // Замените URL на ваш источник данных
          const data = await response.json();
          this.items = data; // Сохраняем полученные данные в переменную items
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      }
    }
  };
</script>

<template>
  <div class="col-md-6 central-block bg-white">
        <div v-for="(item, index) in items" :key="item.id" class="card card-central">
            <div class="card-body">
                <h5 class="card-title">{{item.name}}</h5>
                <p class="card-text">price is {{ item.price }}</p>
                <!-- <button @click="getData" class="btn btn-primary">Зарегистрироваться</button> -->
            </div>
        </div>

    </div>
</template>
