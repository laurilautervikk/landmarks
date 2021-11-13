<template>
  <div class="home">
    <Imagegrid msg="Message from Home.vue" />
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
