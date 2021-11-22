<template>
  <div class="row">
    <h1>{{ landmarkInfo.title }}</h1>
  </div>

  <div class="row">
    <img :src="landmarkInfo.imageUrl" alt="landmark image" />
    <div class="col-sm">
      <h4>
        {{ landmarkInfo.description }}
      </h4>
    </div>
  </div>

  <button @click="$router.go(-1)">Main Menu</button>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "Detailview",
  props: {
    msg: String,
    id: Number,
    title: String,
    imageUrl: String,
    description: String,
  },
  data() {
    //const newLandmark = ref("");
    let landmarkInfo = ref([]);

    //GET request for a single landmark
    async function getLandmark(id) {
      const result = await axios.get(`/api/get-landmark/${id}`);
      landmarkInfo.value = result.data.landmark;
      console.log("landmarkInfo ", landmarkInfo.value);
      console.log(landmarkInfo.value.title);
    }
    // call the above function
    getLandmark(this.$route.params.id);

    return {
      landmarkInfo,
    };
  },
};
</script>

<style scoped>
h1 {
  margin-top: 30px;
}

img {
  height: 500px;
  width: 700px;
  margin-top: 50px;
  margin-right: 30px;
  margin-left: 30px;
}

.col-sm {
  padding-top: 200px;
}

button {
  float: right;
  margin-right: 20px;
}
</style>