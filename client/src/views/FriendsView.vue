<template>
  <div class="friendsView">
    <VNav></VNav>
    <ul>
      <li v-for="user in getUsers" :key="user.id">
        <friend :friend="user" :me="getUser"></friend>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import VNav from "@/components/home/VNav.vue";
import friend from "@/components/friends/friendBlock.vue";

export default defineComponent({
  components: {
    VNav,
    friend,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUsers"]),
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapActions(["fetchUsers"]),
  },
  async mounted() {
    await this.fetchUsers();
  },
});
</script>
