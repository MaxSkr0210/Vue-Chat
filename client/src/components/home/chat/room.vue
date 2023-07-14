<template>
  <li class="room" @click="selectRoom">
    {{ room.name }}
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { socket } from "@/socket";

export default defineComponent({
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectRoom() {
      this.$emit("selectRoom", this.room);
    },
  },
  mounted() {
    socket.on("message", (...args) => {
      if (this.room.id === args[0].room_id) {
        this.room.messages.push(args[0]);
      }
    });
  },
});
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
  border-bottom: 1px solid #0b5ee3;
  padding: 10px;
  &:hover {
    background-color: rgba($color: #0b5ee3, $alpha: 0.1);
  }
}
</style>
