<template>
  <div class="leftPart">
    <div class="serachRooms">
      <input type="text" v-model="search" />
      <button @click="searchRooms">Найти</button>
    </div>
    <ul class="rooms">
      <room
        v-for="room in getRooms"
        :key="room.id"
        :room="room"
        @selectRoom="selectR"></room>
    </ul>
  </div>
</template>

<script>
import { state, socket } from "@/socket";
import { mapGetters, mapActions } from "vuex";
import room from "@/components/home/chat/room.vue";

export default {
  name: "ConnectionState",
  data() {
    return {
      search: "",
    };
  },
  components: {
    room,
  },
  computed: {
    ...mapGetters(["getRooms"]),
  },
  methods: {
    ...mapActions(["findRooms"]),
    selectR(room) {
      this.$emit("selectRoom", room);
    },
    searchRooms() {
      this.findRooms(this.search);
    },
  },
};
</script>

<style lang="scss" scoped>
.leftPart {
  width: 25%;
  border-right: 1px solid #0b5ee3;
  .serachRooms {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #0b5ee3;
  }
}
</style>
