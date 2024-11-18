
<script>
  export default {
    data() {
      return {
        items: [] //data storage
      };
    },
    mounted() {
      this.cardsOnLoad(); //runs on page load and checks if data was already fetched from the server
    },
    methods: {
      cardsOnLoad(){
        let cardDataInCashe = JSON.parse(window.sessionStorage.getItem('CardsData')); 
        if(cardDataInCashe){
          this.items = cardDataInCashe;
          console.log("got data from cache");
        }
        else{
          this.fetchData();
          console.log('got data from fetch')
        }
      },
      async fetchData() {
        try {
          const response = await fetch('http://localhost:3001/items/show-all/money');
          const data = await response.json();
          this.items = data;
          window.sessionStorage.setItem('CardsData', JSON.stringify(data));
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      }
    },

  };
</script>

<template>
        <div v-for="(item, index) in items" :key="item.id" class="card card-central">
            <div class="card-body">
                <h5 class="card-title">{{item.name}}</h5>
                <p class="card-text">price is {{ item.price }}</p>
            </div>
        </div>
</template>
