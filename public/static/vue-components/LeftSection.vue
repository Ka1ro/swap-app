<script>
  export default {
    data() {
      return {
        userData: {},
        avatarUrl: '/static/imgs/standartAvatar.jpg'
        // login: localStorage.getItem('login')// Здесь будут храниться полученные данные
      };
    },
    mounted() {
      this.setData();
    },
    methods: {
        setData(){
            this.userData = {
            login: localStorage.getItem('login'),
            email: localStorage.getItem('email'),
            location:  localStorage.getItem('location'),
            avatarUrl: localStorage.getItem('avatarUrl').replace(/'/g, ''), ///.split("'")[1],
            createdAt: localStorage.getItem('createdAt')
          }
        }
    }
  };
</script>

<template>
  <div class="col-md-3 user-block bg-light">
        <div class="text-center mt-4">
            <img :src="userData.avatarUrl" alt="Profile Image" class="profile-img">
        </div>
        <div class="mt-4">
            <!-- <div v-for="(item, index) in userData" :key="index" class="form-group">
                <label for="name">{{item}}</label>
            </div> -->
            <h5>Login : <span class="badge text-bg-info">{{ userData.login }}</span></h5>
            <h5>Email : <span class="badge text-bg-info">{{ userData.email }}</span></h5>
            <h5>Location : <span class="badge text-bg-info">{{ userData.location }}</span></h5>
            <p>Registration Date: {{ userData.createdAt.split('T')[0] }}</p>
        </div>
    </div>
</template>