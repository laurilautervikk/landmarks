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

<<<<<<< HEAD
<<<<<<< HEAD
<style>

<style>
=======


/* <style>

>>>>>>> c980048b3fc277dc0d9f5dc0e7237ad1dfc92972
=======
<style>
>>>>>>> 3100398f7edd0fc68e038117491c17bcace78105
button {
  margin-top: 20px;
    background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 6px;
  font-weight: 600;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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

<<<<<<< HEAD
 div {
  border: 1px solid red;
} 

</style> 
=======
</style>
>>>>>>> 3100398f7edd0fc68e038117491c17bcace78105
