<template>
  <div class="friend">
    {{ friend.username }}
    <button @click="addToFriend">Добавить в друзья</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { socket } from "@/socket";

export default defineComponent({
  props: {
    friend: {
      type: Object,
      required: true,
    },
    me: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToFriend() {
      socket.emit("add-friend", this.me, this.friend);
    },
  },
});
</script>
