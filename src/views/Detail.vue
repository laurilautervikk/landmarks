<template>
  <div class="home">
    <Detailview msg="Message from Detail.vue" />
  </div>
</template>

<script>
// @ is an alias to /src
import Detailview from "@/components/Detailview.vue";

export default {
  name: "Detail",
  components: {
    Detailview,
  },
};
</script>
