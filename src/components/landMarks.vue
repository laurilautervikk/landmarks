<template>
  <div class="row row-cols-4">
    <div class="col" v-for="landmark in landmarksFromServer" :key="landmark">
      <router-link :to="`/landmark/${landmark.id}`" class="col">
        <img :src="landmark.imageUrl" alt="landmark image" />
        <p class="col" id="title">{{ landmark.title }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  name: "Imagegrid",
  props: {
    to: String,
    msg: String,
    id: Number,
    title: String,
    imageUrl: String,
  },

  data() {
    const newLandmark = ref("");
    let landmarksFromServer = ref([]);

    //GET request for a list of landmarks
    async function getLandmarks() {
      const result = await axios.get("/api/get-landmarks");
      landmarksFromServer.value = result.data.landmarks;
      console.log("landmarksFromServer ", landmarksFromServer.value);
    }
    // call the above function
    getLandmarks();
    async function addNewLandmark() {
      const headers = {
        "Content-Type": "application/json",
      };

      let data = {
        title: newLandmark.value,
      };
      await axios
        .post("/api/post-landmark", data, {
          headers: headers,
        })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log("newLandmark sent from the front: ", data);
      getLandmarks();
    }

    return {
      newLandmark,
      addNewLandmark,
      landmarksFromServer,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title {
  margin: 10px;
}
img {
  padding: 10px;
  max-height: 250px;
  max-width: 250px;
}
.row.row-cols-4 {
  margin-top: 120px;
}
</style>
