<template>
  <div class="home">
    <landMarks msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src

import landMarks from "../components/landMarks.vue";

export default {
  name: "Home",
  components: {
    landMarks,
},
};
</script>
