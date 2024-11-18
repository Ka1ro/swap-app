<template>
  <div class="container mt-5">
      <h2 class="mb-4">Autorissation</h2>
        <form @submit.prevent="handleSubmit" id="loginForm">
            <!-- <div class="form-group">
                <label for="email">Электронная почта</label>
                <input type="email" class="form-control" id="email" name="email" required>
            </div> -->
              <div class="form-group">
                <label for="login">Login</label>
                <input type="login" v-model="username" class="form-control" id="login" name="login" required>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" v-model="password" class="form-control" id="password" name="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
  </div>
  <div class="container">
    <h1>You are already logged in, do you want to logg out?</h1>
  </div>

    <!-- for devv -->
    <button @click="checkCookie" id="warnBtn" type="button" class="btn btn-warning">check Cookie</button>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
      isIN: false,
    };
  },
  mounted(){
    // this.isIN = this.checkCookie()
  },
  methods: {
    async handleSubmit() {
        try {
          const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login: this.username,
              password: this.password,
            }),
          });

          if (!response.ok) {
            throw new Error('Invalid login credentials');
          }

          const data = await response.json();
          console.log('Login successful:', data);
          this.setCookie('token', data.token, 0.1);
          window.sessionStorage.setItem("UserData", JSON.stringify(data));
          window.location.replace("/");
        } catch (error) {
          this.error = error.message;
      }
    },
    setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
      },
    eraseCookie() {
        localStorage.clear();
        document.cookie = "token" + "=" + "; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        document.location.reload();
      },
    checkCookie(){
      if(document.cookie){
        console.log('you are logged in');
        return true;
      }
      return false;
    }
  },
};
</script>

<!-- <script>
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Сбор данных из формы
            const formData = {
               login: document.getElementById('login').value,
                // email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            };

            // Отправка данных через fetch
            fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setCookie('token', data.token, 0.1);
                for(let str in data){
                    localStorage.setItem(str, data[str]);
                }
                window.location.replace("/main");
            })
            .catch(error => {
                console.error('Error:', error);
                // Обработка ошибки здесь
            });
        });
        let exitBtn = document.
        getElementById('exitBtn')        
        .addEventListener("click", ()=>{
                setCookie('token', 'null', -1);
                localStorage.clear();
                console.log('cookie deleted');
            });

        function setCookie(name,value,days) {
                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days*24*60*60*1000));
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + (value || "")  + expires + "; path=/";
            };
    </script> -->