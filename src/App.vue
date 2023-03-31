<template>
  <div>
    <img alt="Vue logo" src="./assets/logo_igreja.png" />
    <RouterView></RouterView>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  },
};
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
img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
</style>
