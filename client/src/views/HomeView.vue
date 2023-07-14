<template>
  <div class="home">
    <VNav></VNav>
    <div class="mid">
      <router-link to="/create">Создать чат</router-link>
      <VChatWindow></VChatWindow>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { socket } from "@/socket";
import VNav from "@/components/home/VNav.vue";
import VChatWindow from "@/components/home/VChatWindow.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    VNav,
    VChatWindow,
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
