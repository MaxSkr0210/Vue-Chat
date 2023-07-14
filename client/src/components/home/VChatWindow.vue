<template>
  <div class="VChatWindow">
    <LeftPart @selectRoom="seectR"></LeftPart>
    <RightPart :room="room" v-if="selectedRoom"></RightPart>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import LeftPart from "@/components/home/chat/LeftPart.vue";
import RightPart from "@/components/home/chat/RightPart.vue";

export default defineComponent({
  components: {
    LeftPart,
    RightPart,
  },
  data() {
    return {
      room: {},
      selectedRoom: false,
    };
  },
  methods: {
    seectR(room) {
      this.room = room;
      this.selectedRoom = true;
    },
  },
});
</script>
<style lang="scss" scoped>
.VChatWindow {
  margin-top: 50px;
  height: 90%;
  display: flex;
  border: 1px solid #0b5ee3;
  border-radius: 15px;
}
</style>
