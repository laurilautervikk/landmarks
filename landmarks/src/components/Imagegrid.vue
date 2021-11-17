<template>
  <h3>{{ msg }}</h3>
  <p>Local message from Imagegrid.vue</p>
  <div class="container">
    <div class="row">
      <div
        class="col col-sm-6 col-md-4 col-lg-3 img-thumbnail"
        v-for="landmark in landmarksFromServer"
        :key="landmark"
      >
        <router-link :to="`/landmark/${landmark.id}`" class="container">
          <img
            :src="landmark.imageUrl"
            alt="landmark image"
            width="200"
            height="200"
          />
          <p id="id-info">ID:{{ landmark.id }}</p>
          <p>{{ landmark.title }}</p>
        </router-link>
      </div>
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
    // POST request
    async function addNewLandmark() {
      const headers = {
        "Content-Type": "application/json",
      };

      let data = {
        title: newLandmark.value,
        imageUrl: "https://en.pimg.jp/065/184/793/1/65184793.jpg",
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

