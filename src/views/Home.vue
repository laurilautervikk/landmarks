<template>
  <div class="home">
    <Imagegrid msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src

import Imagegrid from "@/components/Imagegrid.vue";

export default {
  name: "Home",
  components: {
    Imagegrid,
  },
};
</script>
