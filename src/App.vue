<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <my-header></my-header>
    
    <router-view/>
  </div>
</template>

<script>
import MyHeader from './components/header.vue'
export default {
  components: { MyHeader },
  name: 'App',
    provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
      return {
        reload: this.reload                                              
      }
    },
    data() {
      return{
        isUserHome: this.$route.path  == '/home',
        isRouterAlive: true                    //控制视图是否显示的变量
      }
    },
    mounted() {
      // console.log( this.$route.path  == '/home')
    },
    methods: {
      reload () {
        this.isRouterAlive = false;            //先关闭，
        this.$nextTick(function () {
            this.isRouterAlive = true;         //再打开
        }) 
      }
    }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
