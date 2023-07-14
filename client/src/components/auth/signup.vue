/* eslint-disable */
<template>
  <div class="signup">
    <h2>SignUp</h2>
    <form>
      <input type="text" placeholder="Login" v-model="login" />
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input
        type="password"
        placeholder="Repeat password"
        v-model="rePassword" />
      <p class="error" v-if="error">{{ errorText }}</p>
      <button @click="register">SignUp</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { UserType } from "@/types/UserType";

export default defineComponent({
  data() {
    return {
      login: "",
      email: "",
      password: "",
      rePassword: "",
      error: false,
      errorText: "",
    };
  },
  methods: {
    ...mapActions(["SignUp"]),
    async register(e: Event) {
      e.preventDefault();
      if (
        this.login.trim() === "" ||
        this.email.trim() === "" ||
        this.password.trim() === "" ||
        this.rePassword.trim() === ""
      ) {
        this.error = true;
        this.errorText = "Заполните все поля";
      } else if (this.password !== this.rePassword) {
        this.error = true;
        this.errorText = "Пароли не совпадают";
      } else {
        try {
          const newUser: UserType = {
            username: this.login,
            email: this.email,
            password: this.password,
          };
          await this.SignUp(newUser);
          console.log(123);

          this.error = false;
          this.$router.push("/");
        } catch (error: any) {
          this.error = true;
          this.errorText = error.response.data;
        }
      }
    },
  },
});
</script>

<style scoped lang="scss">
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    input {
      width: 250px;
      border: 1px solid silver;
      border-radius: 8px;
      margin-bottom: 15px;
      padding: 5px 10px;
    }
    button {
      margin: 0 auto;
    }
  }
}
</style>
