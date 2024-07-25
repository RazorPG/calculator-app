<template>
  <div class="text-3xl md:text-5xl font-bold mb-6 md:mb-8">
    <h1>MY CALCULATOR APP</h1>
  </div>
  <Layout />
</template>

<script>
  import Layout from './components/Layout.vue'
  export default {
    name: 'App',
    data: function () {},
    components: {
      Layout,
    },
    methods: {},
  }
</script>

<style>
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
