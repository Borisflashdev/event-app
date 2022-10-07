<template>
  <nav-bar></nav-bar>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <footer-tab></footer-tab>
</template>

<script>
import NavBar from './components/ui/NavBar.vue';
import FooterTab from './components/ui/FooterTab.vue';

export default {
  components: {
    NavBar,
    FooterTab  
  },
  created() {
    this.$store.dispatch('autoLogin');
  }
}
</script>

<style>
body {
  margin: 0px;
  font-family: Courier, monospace;
}
.link-div {
  display: flex;
  justify-content: space-evenly;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
