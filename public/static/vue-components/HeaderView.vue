<script>
const COOKIES = document.cookie;
export default {
  data() {
    return {
          somenumber(){
            console.log(COOKIES);
          },
          eraseCookie() {
            localStorage.clear();
            document.cookie = "token" + "=" + "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            document.location.reload();
          }
    }
  }
}
</script>




<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">YourLogo</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Главная <span class="sr-only">(текущая)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">О нас</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Услуги</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Контакты</a>
        </li>
      </ul>
      <form v-if="COOKIES" class="form-inline my-2 my-lg-0">
        <button @click="somenumber"  class="btn btn-outline-success my-2 my-sm-0" type="button">Войти</button>
        <button class="btn btn-primary ml-2" type="button">Регистрация</button>
      </form>
      <form v-else class="form-inline my-2 my-lg-0">
        <button v-on:click="eraseCookie" id="exitBtn" type="button" class="btn btn-danger">Exit</button>
      </form>
    </div>
  </nav>
</template>