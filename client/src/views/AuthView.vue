<template>
  <div class="authView">
    <SignIn></SignIn>
    <hr />
    <SignUp></SignUp>
  </div>
</template>

<style scoped lang="scss">
.authView {
  display: flex;
  justify-content: center;
  gap: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  hr {
    position: absolute;
    height: 100%;
    top: 50%;
    transform: translate(0, -50%);
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import SignUp from "@/components/auth/signup.vue";
import SignIn from "@/components/auth/signin.vue";

export default defineComponent({
  components: {
    SignUp,
    SignIn,
  },
});
</script>
