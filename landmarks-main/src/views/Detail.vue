<template>
  <div class="home">
    <Detailview msg="Message from Detail.vue" />
    <Footer msg="Message from Footer.vue" />
  </div>
</template>

<script>
// @ is an alias to /src
import Imagegrid from "@/components/Imagegrid.vue";
import Footer from "@/components/footer.vue";


export default {
  name: "Home",
  components: {
    Imagegrid,
    Footer,
  },
  data() {
    return {
      id: 0,
    };
  },
};
</script>

