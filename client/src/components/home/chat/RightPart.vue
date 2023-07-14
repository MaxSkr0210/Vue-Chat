<template>
  <div class="rightPart">
    <div class="head">
      {{ room.name }}
      <button @click="addUser">+</button>
    </div>
    <div class="body">
      <ul>
        <messageComponent
          v-for="message in room.messages"
          key="message.id"
          :message="message"
          :user="getUser"></messageComponent>
      </ul>
    </div>
    <div class="input">
      <input type="text" v-model="input" />
      <button @click="message">Ввести</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { socket } from "@/socket";
import messageComponent from "@/components/home/chat/message.vue";

export default defineComponent({
  props: {
    room: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    messageComponent,
  },
  data() {
    return {
      input: "",
    };
  },
  computed: {
    ...mapGetters(["getUser", "getRooms"]),
  },
  methods: {
    ...mapActions(["InviteUser"]),
    message() {
      socket.emit("message", this.getUser, this.room, this.input);
      this.input = "";
    },
    async addUser() {
      // await this.InviteUser(this.user, this.room);
    },
  },
  mounted() {},
});
</script>

<style lang="scss" scoped>
.rightPart {
  width: 75%;
  display: flex;
  flex-direction: column;
  height: 100%;
  .head {
    border-bottom: 1px solid #0b5ee3;
    padding: 10px;
    flex: 0 0 auto;
  }
  .body {
    padding: 10px;
    flex: 1 0 auto;
    height: 76%;
    overflow-y: scroll;
  }
  .input {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #0b5ee3;
    padding: 10px;
    bottom: 0;
    flex: 0 0 auto;
    input {
      width: 80%;
    }
  }
}
</style>
