<template>
  <div>
    <!-- Кнопка, цвет которой зависит от наличия cookies -->
    <button :style="buttonStyle" @click="checkCookie">Check Cookie</button>
    <button  @click="setCookie">Check Cookie</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasCookie: false // Переменная для хранения состояния наличия cookie
    };
  },
  computed: {
    buttonStyle() {
      return {
        backgroundColor: this.hasCookie ? 'green' : 'red', // Меняем цвет кнопки
        color: 'white'
      };
    }
  },
  methods: {
    setCookie(){
      document.cookie = 'user=SomeUser'
    },  
    checkCookie() {
      // Проверяем наличие определённого cookie (например, 'user')
      const cookieName = 'user'; // Укажите имя cookie
      const cookies = document.cookie.split('; ');
      const foundCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
      this.hasCookie = !!foundCookie; // Обновляем переменную состояния
    }
  },
  mounted() {
    // Проверяем наличие cookie при загрузке компонента
    this.checkCookie();
  }
};
</script>

<style scoped>
/* Стили для кнопки */
button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
</style>
