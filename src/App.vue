<template>
 <div>
  <div class="pano"></div>
  <toasts ref="toasts"></toasts>
  <RouterView></RouterView>
 </div>
</template>

<script>
import Pusher from "pusher-js";

export default {
 name: "App",
 data() {
  return {
   channel: null,
  };
 },
 mounted() {
  const pusher = new Pusher("b9fd36fe72d986cec08f", {
   cluster: "us2",
   authEndpoint: "/pusher/auth",
   auth: {
    headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
   },
  });

  this.channel = pusher.subscribe("my-channel");
  this.channel.bind("new-user", (res) => {
   console.log(res.message);
   this.$toast.open({
    message: res.message,
    type: "info",
    position: "top-right", // Você pode escolher entre 'top-right', 'top-left', 'bottom-right', 'bottom-left'
    duration: 5000, // Duração da notificação em milissegundos
   });
  });
  this.channel.bind("remove-user", (res) => {
   this.$toast.open({
    message: res.message,
    type: "info",
    position: "top-right", // Você pode escolher entre 'top-right', 'top-left', 'bottom-right', 'bottom-left'
    duration: 5000, // Duração da notificação em milissegundos
   });
  });
  this.channel.bind("check-user", (res) => {
   console.log(res.message);
   this.$toast.open({
    message: res.message,
    type: "success",
    position: "top-right", // Você pode escolher entre 'top-right', 'top-left', 'bottom-right', 'bottom-left'
    duration: 5000, // Duração da notificação em milissegundos
   });
  });
 },
 methods: {
  showToast(message) {
   this.$toast.open({
    message: message,
    type: "info",
    position: "top-right", // Você pode escolher entre 'top-right', 'top-left', 'bottom-right', 'bottom-left'
    duration: 5000, // Duração da notificação em milissegundos
   });
  },
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
.btn {
 cursor: pointer;
}
</style>
