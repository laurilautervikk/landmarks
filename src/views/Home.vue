<template>
  <div class="home">
    <landMarks msg="Welcome to Your Vue.js App" />
    <Imagegrid msg="Message from Home.vue" />
  </div>
</template>

<script>
// @ is an alias to /src

import Imagegrid from "@/components/Imagegrid.vue";


import landMarks from "@/components/landMarks.vue";
import Imagegrid from "@/components/Imagegrid.vue";

export default {
  name: "Home",
  components: {
    landMarks,
},
export default {
  name: "Home",
  components: {
    Imagegrid,
  },
  data() {
    return {
      id: 0,
    };
  },
},
};

</script>
