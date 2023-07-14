<template>
  <li class="message" :class="{ my: my }">
    {{ message.message }}
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      my: this.message.user_id === this.user.id,
    };
  },
});
</script>

<style lang="scss" scoped>
li.my {
  text-align: end;
}
</style>
