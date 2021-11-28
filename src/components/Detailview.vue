<template>
  <div class="row">
    <h1>{{ landmarkInfo.title }}</h1>

    <div class="container-fluid">
      <div class="card">
        <img :src="landmarkInfo.imageUrl" alt="landmark image" />
      </div>
    </div>

    <div class="container-fluid2">
      <div class="cardtext">
        <h4>{{ landmarkInfo.description }}</h4>
      </div>
    </div>

    <div class="container mb-3">
      <button @click="$router.go(-1)">Main Menu</button>
    </div>
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

<style scoped>
.row {
  background-image: url("https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700422093.jpg");
  height: 100%;
  background-position: center;
  background-size: cover;
}

h1 {
  margin-top: 30px;
  margin-bottom: 60px;
  color: azure;
}

.container-fluid {
  margin: 1em 0;
  margin-left: 290px;
  border-radius: 0.5em;
  width: fit-content;
  padding: 0px;
  box-shadow: -6px 9px 9px rgb(0, 0, 0);
  border-right: none;
}

.card {
  border-radius: 0.5em;
  border: none !important;
}

.card img {
  object-fit: cover;
  height: 500px;
  width: 700px;
  border-radius: 0.5em;
  border: 1px solid rgb(192, 192, 192);
  border-right: none;
}

.container-fluid2 {
  margin: 1em 0;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 0.5em;
  width: fit-content;
  padding: 0px;
  box-shadow: 6px 9px 9px rgb(0, 0, 0);
  border-left: none;
}

h4 {
  height: 125px;
  width: 500px;
  color: #ffffff;
  text-align: center;
  margin-top: 160px;
  padding-right: 15px;
  padding-left: 15px;
  border-left: none;
}

button {
  float: right;
  margin-right: 20px;
  height: 52px;
  width: 200px;
  padding: 0 40px;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 6px;
  font-weight: 600;
}
</style>