<template>
  <div class="home">
    <LandMarks />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import LandMarks from "@/components/LandMarks.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    LandMarks,
    Footer,
  },
  data() {
    return {
      id: 0,
    };
  },
  methods: {
  },
};
</script>

<style>
.home {
  min-height: 100vh
}

div {
  border: 1px solid red;
}
</style>
