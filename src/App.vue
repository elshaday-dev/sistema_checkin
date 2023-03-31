<template>
  <div>
    <div class="pano"></div>
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
body {
  background-color: rgb(27, 27, 27);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}
img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
</style>
