<template>
  <nav>
    <div class="mid">
      <div class="logo">
        <router-link to="/">
          <img
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-dark.svg"
            alt="" />
          <span>Chat</span>
        </router-link>
      </div>
      <div class="list">
        <router-link to="/friends">Friends</router-link>
      </div>
      <div class="user">
        <span> {{ getUser.username }} </span
        ><button @click="out">LogOut</button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "HomeView",
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapActions(["signOut"]),
    async out() {
      await this.signOut();
      this.$router.replace("/auth");
    },
  },
});
</script>

<style lang="scss" scoped>
nav {
  padding: 10px;
  border-bottom: 1px solid #0b5ee3;
  .mid {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo a {
    display: flex;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      font-size: 25px;
      font-weight: bold;
      display: flex;
      align-items: center;
    }
  }
  .user {
    span {
      margin-right: 15px;
    }
  }
}
</style>
