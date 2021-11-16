<template>
  <div class="home">
    <Detailview msg="Message from Detail.vue" />
    <Footer msg="Message from Footer.vue" />
  </div>
</template>

<script>
// @ is an alias to /src
import Detailview from "@/components/Detailview.vue";
import Footer from "@/components/Footer.vue";


export default {
  name: "Detail",
  components: {
    Detailview,
    Footer,
  },
};
</script>

