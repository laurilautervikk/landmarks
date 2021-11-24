<template>
  <div class="home">
  
    <landMarks msg="Welcome to Your landMarks.vue" />
    <Footer msg="Message from Footer.vue" />
  </div>
</template>

<script>
// @ is an alias to /src

import landMarks from "@/components/landMarks.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    landMarks,
    Footer,
},
  data() {
    return {
      id: 0,
    };
  },
}

</script>
<style>
/* div {
  border: 1px solid red;
} */
</style>
