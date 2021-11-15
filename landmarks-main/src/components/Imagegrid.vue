<template>
  <h3>{{ msg }}</h3>
  <p>Local message from Imagegrid.vue</p>
  <div class="container">
    <div class="row">
      <div
        class="col col-sm-12 col-lg-3 img-thumbnail"
        v-for="landmark in landmarksFromServer"
        :key="landmark"
      >
        <img
          :src="landmark.imageUrl"
          alt="landmark image"
          width="200"
          height="200"
        />
        <p>ID:{{ landmark.id }}</p>
        <p>{{ landmark.title }}</p>
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
    msg: String,
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
      console.log("landmarksFromServer ", landmarksFromServer);
      console.log("landmarksFromServer ", landmarksFromServer.value);
    }
    // call the above function
    getLandmarks();

    async function addNewLandmark() {
      // POST request using axios with async/await
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

<footer id="footer" role="contentinfo">
  <p>
    <a class="social-icon" href="https://github.com/laurilautervikk/landmarks" target="_blank" rel="noopener">
      <svg aria-labelledby="simpleicons-github-icon" role="img" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon" lang="en">GitHub icon</title><path fill="#FFFFFF" </svg>

    </a>
  </p>
  <p>Lauri Lauter 
  Edgar Kollamaa
  Ekaterina Chigasova
  Mikk Ereline
  Taavet Lehiste
  Copyright &copy; 2021 </p>
</footer>