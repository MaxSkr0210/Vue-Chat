<template>
  <router-view />
  <VNotificatoin></VNotificatoin>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VNotificatoin from "@/components/all/Vnotifications.vue";

export default defineComponent({
  components: {
    VNotificatoin,
  },
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100%;
  font-size: 18px;
  overflow-y: hidden;
}

#app {
  margin: 0;
  padding: 0;
  height: 100%;
}

.mid {
  height: 83%;
  width: 1200px;
  margin: 0 auto;
}

button {
  width: fit-content;
  padding: 7px 12px;
  background-color: #fff;
  border: 1px solid #0b5ee3;
  transition: all ease 0.4s;
  &:hover {
    background-color: #0b5ee3;
    color: #fff;
    box-shadow: 1px 1px 8px rgba($color: #0b5ee3, $alpha: 0.6);
  }
}

button,
input,
textarea {
  font-size: 16px;
  outline: none;
  border-radius: 8px;
  border: 1px solid #0b5ee3;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none;
  color: #000;
}

.error {
  color: red;
  text-align: center;
  margin: 0 0 15px 0;
}
</style>
