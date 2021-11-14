<template>
  <div class="container">
    <p>{{ msg }}</p>
    <div class="row">
      <div class="col">
        <h3>{{ landmarkInfo.title }}</h3>
        <span>ID:{{ landmarkInfo.id }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <img :src="landmarkInfo.imageUrl" alt="landmark image" />
      </div>
      <div class="col">
        <p>{{ landmarkInfo.description }}</p>
      </div>
    </div>

    <router-link :to="'/'" class="container">
      <p>main page</p>
    </router-link>
  </div>
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

<style scoped></style>
