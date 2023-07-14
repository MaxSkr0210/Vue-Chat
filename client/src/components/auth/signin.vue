<template>
  <div class="signin">
    <h2>SignIn</h2>
    <form>
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <p class="error" v-if="error">{{ errorText }}</p>
      <button @click="login">SignIn</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorText: "",
    };
  },
  methods: {
    ...mapActions(["SignIn"]),
    async login(e: Event) {
      e.preventDefault();
      if (this.email.trim() === "" || this.password.trim() === "") {
        this.error = true;
        this.errorText = "Заполните все поля";
        this.errorText = "Пароли не совпадают";
      } else {
        try {
          const user = {
            email: this.email,
            password: this.password,
          };

          console.log(user);

          await this.SignIn(user);
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
.signin {
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
