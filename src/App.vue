<template>
  <!-- <button v-on:click="() => TogglePopups('buttonTrigger')">Add Landmark</button>
   <Popup v-if="popupTriggers.buttonTrigger">
    <landmark-form />
    <button @click="() => TogglePopups('buttonTrigger')">Close</button>
  </Popup> -->

  <router-view />
</template>

<script>
/*import { ref } from "vue";
import Popup from "./components/landmarkForm.vue";
import landmarkForm from "./components/landmarkForm.vue"; */

/* export default {
  components: { landmarkForm },
  setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
    });
    const TogglePopups = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };
    return {
      Popup,
      popupTriggers,
      TogglePopups,
    };
  },
}; */
</script>

<style>
button {
  margin-top: 20px;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 6px;
  font-weight: 600;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
