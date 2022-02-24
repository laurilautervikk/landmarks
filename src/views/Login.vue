<template>
  <div class="container layout">
    <div
      class="row justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card p-3">
          <h3>Login</h3>
          <!-- HINT -->
          <br />
          <!-- <p>example@test.ee</p>
          <p>example</p> -->
          <!-- HINT -->
          <div class="card-body">
            <div class="input-group mb-3">
              <span class="input-group-text"
                ><i class="fas fa-envelope"></i
              ></span>
              <input
                type="text"
                class="form-control"
                name="email"
                v-model="email"
                placeholder="exmaple@test.ee"
              />
            </div>
            <br />
            <div class="input-group mb-2">
              <span class="input-group-text"><i class="fas fa-key"></i></span>
              <input
                type="password"
                class="form-control"
                name="password"
                v-model="password"
                placeholder="Password"
              />
            </div>
            <br />
            <div class="d-flex justify-content-between">
              <button type="button" @click="login" class="btn login_btn">
                Login
              </button>
            </div>
            <br />
            <div class="d-flex justify-content-between">
              Don't have an account?
              <button
                class="btn btn-secondary"
                id="register"
                @click="$router.push('/register')"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import axios from "axios";
import router from "./../router";
export default defineComponent({
  setup() {
    let email = ref("");
    let password = ref("");
    async function login() {
      const { data } = await axios.post("/api/auth/login", {
        email: email.value,
        password: password.value,
      });
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      router.push("/");
    }
    return {
      email,
      password,
      login,
    };
  },
});
</script>
<style scoped>
.login_btn {
  width: 100%;
}
button {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 0.5em;
}
#register {
  margin: top 20px;
}
.card {
  background-color: #2ab1ce;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.input-group-text {
  background: #4d4d4d !important;
  color: white !important;
  border: 0 !important;
  border-radius: 0.25rem 0 0 0.25rem !important;
}
</style>
