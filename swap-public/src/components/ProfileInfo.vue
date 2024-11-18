<script>
  export default{
    data() {
    return {
      userData: {},
      avatarUrl: '/src/imgs/standartAvatar.jpg',
      isIN: false,
    };
  },
  mounted(){
    if(this.checkCookie()){this.isIN = true} // simple *IsIN = checkCokkies* didnt work somehow
    this.getDataFromStorage();
  },
  methods: {
    checkCookie(){
      if(document.cookie){
        console.log('you are logged in');
        return true;
      }
      console.log("noocokie")
      return;
    },
    async getDataFromStorage(){
      if(document.cookie){
        let userInfo = JSON.parse(window.sessionStorage.getItem("UserData"));
        if (userInfo!=null) {
            this.userData = userInfo;
        } else {
          console.log("no data in session stodage")
          try{
            console.log("making request..");
            let response = await fetch('http://localhost:3001/auth/me', {credentials: "include"});
            let userData = await response.json();
            console.log("data got from fetch", userData);
            this.userData = userData;
            window.sessionStorage.setItem("UserData", JSON.stringify(userData));
          }catch(error){
            console.log("error getting user info || ", error)
          }        
        }
  
      }
      else{
        console.log("no token")
        return;
      }

    },
  },
  }
</script>

<template>
  <p>Левая колонна, 4 ячейки</p>
  <div v-if="isIN" class="card m-3">
    <div class="text-center mt-4">
      <img :src="(`${avatarUrl}`)" alt="Profile Image" class="profile-img">
    </div>
      <div class="mt-4">
        <h5>Login : <span class="badge text-bg-info">{{ userData.login }}</span></h5>
        <h5>Email : <span class="badge text-bg-info">{{ userData.email }}</span></h5>
        <h5>Location : <span class="badge text-bg-info">{{ userData.location }}</span></h5>
        <p>Registration Date: {{ userData.createdAt.split('T')[0] }}</p>
      </div>
  </div>

  <div v-else class="user-block bg-light"> You are not logged in</div>

</template>