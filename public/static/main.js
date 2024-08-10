const { loadModule } = window['vue3-sfc-loader'];

const VueLoaderOpts = {
  moduleCache: { vue: Vue },
  async getFile(url) {
    const res = await fetch(url)
    if(!res.ok)
       throw Object.assign(new Error(url+' '+res.statusText), { res });
    return await res.text();
  },
  addStyle: () => {},
}

const app = Vue.createApp({
  components: {
    'LeftSection': Vue.defineAsyncComponent(() => loadModule('./static/vue-components/LeftSection.vue', VueLoaderOpts)),
    'MiddleSection': Vue.defineAsyncComponent(() => loadModule('./static/vue-components/MiddleSection.vue', VueLoaderOpts)),
    'RightSection': Vue.defineAsyncComponent(() => loadModule('./static/vue-components/RightSection.vue', VueLoaderOpts)),
    'HeaderView' : Vue.defineAsyncComponent(()=> loadModule('./static/vue-components/HeaderView.vue', VueLoaderOpts))
    },
    data(){
      const text = Vue.ref('hello app');
      return{
        text: "MEsage"
      }
    }
})

app.mount('#app')