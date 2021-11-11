<template>
  <div class="home">
    <LandMark msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src

import LandMark from "@/components/LandMark.vue";

export default {
  name: "Home",
  components: {
    LandMark,
},
};
</script>
