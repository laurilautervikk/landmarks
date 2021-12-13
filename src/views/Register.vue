<template>
  <div class="container">
    <div
      class="row justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card p-3">
          <h3>Register</h3>
          <div class="card-body">
            <div class="input-group mb-3">
               <span class="input-group-text"><i class="fas fa-envelope"></i></span>
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
            <div class="input-group mb-2">
            <span class="input-group-text"><i class="fas fa-key"></i></span>
              <input
                type="password"
                class="form-control"
                name="password"
                v-model="password2"
                placeholder="Confirm Password"
              />
            </div>
            <br />
            <div class="d-flex justify-content-between">
              <button type="button" @click="register" class="btn btn-primary">
                Register
              </button>
            </div>
              <br />
              <div class="d-flex justify-content-between">Allready have an account? Log in
              <button class="btn btn-secondary" @click="$router.push('/login')">
                Login
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
export default defineComponent({
  setup() {
    let email = ref("");
    let password = ref("");
    let password2 = ref("");
    async function register() {
      if (password.value === password2.value) {
        await axios.post("/api/auth/register", {
          email: email.value,
          password: password.value,
        });
      } else {
        alert("Password are not matching!");
      }
    }
    return {
      email,
      password,
      password2,
      register,
    };
  },
});
</script>
<style scoped>
.btn-primary{
  width: 100%;
}
.card{
  background-color: #2ab1ce;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
button{
    background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 0.5em;
}
.input-group-text {
 background: #4d4d4d  !important;
 color: white !important;
 border: 0 !important;
 border-radius: 0.25rem 0 0 0.25rem !important;
 }
</style>
