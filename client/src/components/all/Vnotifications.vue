<template>
  <ul class="notifications">
    <li
      class="notification"
      v-for="(notification, index) in notifications"
      :key="notification"
      :class="{
        visible: notification.visible,
        invisible: !notification.visible,
      }">
      <div class="header">
        <p @click="close(notification, index)" class="cross">&#10010;</p>
      </div>
      <div class="body">
        <p class="text">{{ notification.message }}</p>
        <div class="choose" v-if="type === 'invitation'">
          <button @click="accept">Принять</button>
          <button @click="refuse">Отказать</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { socket } from "@/socket";

export default defineComponent({
  data() {
    return {
      type: "",
      to: {},
      from: {},
      room: {},
      notifications: [] as any[],
    };
  },
  methods: {
    close(notification, index) {
      this.notifications[index].visible = false;
      setTimeout(() => {
        this.notifications.splice(index, 1);
      }, 800);
    },
    accept() {
      socket.emit("accept", this.to, this.from, this.room);
      this.close();
    },
    refuse() {
      socket.emit("refuse", this.to, this.from);
      this.close();
    },
  },
  mounted() {
    socket.on("notification", (notification, type, to, from, room) => {
      const not = {
        message: notification,
        type,
        to,
        from,
        room,
        visible: false,
      };

      this.type = type;
      this.to = to;
      this.from = from;
      this.room = room;
      this.notifications.push(not);
    });
  },
});
</script>

<style lang="scss" scoped>
.visible {
  right: 15px;
}

.invisible {
  right: -300px;
}
.notifications {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 15px;
  bottom: 15px;
  transition: all 0.3s ease;

  .notification {
    position: relative;
    border: none;
    bottom: 15px;
    border-radius: 5px;
    background-color: #5294ff;
    color: #fff;
    padding: 10px;
    transition: all 0.8s ease;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    .header {
      text-align: end;
      .cross {
        display: inline-block;
        width: min-content;
        margin: 0;
        transform: rotate(45deg);
        cursor: pointer;
      }
    }
    .body {
      p {
        margin: 8px 0;
      }
      .choose {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
