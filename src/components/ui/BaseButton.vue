<template>
    <button class=".button" v-if="isButton">
        <slot></slot>
    </button>
    <router-link v-else :to="to" class="router-style">
      <slot></slot>
    </router-link>
</template>

<script>
export default {
  props: ['isButton', 'to']
}
</script>

<style scoped>
button {
  background-color: black;
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-family: Courier;
}

.router-style {
  border: none;
  color: black;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  font-family: Courier;
}
.router-link-active {
  color: black;
  border-bottom: 2px solid black;
}
</style>