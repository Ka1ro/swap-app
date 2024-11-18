<template>
   <div class="container mt-5">
        <h2 class="mb-4">Регистрация</h2>
        <form id="registrationForm">
            <div class="form-group">
                <label for="username">Имя пользователя</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="email">Электронная почта</label>
                <input type="email" class="form-control" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="location">Location</label>
              <input type="text" class="form-control" id="location" name="location" required>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
        </form>
    </div>
    <button id="exitBtn" type="button" class="btn btn-danger">Exit</button>
</template>

<script>
export default {
  name: 'RegisterPage',
};
</script>