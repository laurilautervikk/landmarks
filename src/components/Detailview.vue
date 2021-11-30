<template>






<!-- old image -->


<div class="row">
    <h1>{{ landmarkInfo.title }}</h1>

    <div class="container-fluid">
      <div class="card">

      <!-- <div class="card" v-for="i in landmarkInfo.imageUrlSet" :key="i">

        <img :src="i" alt="landmark image" /> -->

       <!-- </div> -->


          <!-- SLIDER START -->

                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">

                  <div class="carousel-item active" v-for="i in landmarkInfo.imageUrlSet" :key="i">
                    <img class="d-block w-100" :src="i" alt="First slide">
                  </div>

                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>


          <!-- SLIDER END -->

      </div>
    </div>

    <div class="container-fluid2">
      <div class="cardtext">
        <h4>{{ landmarkInfo.description }}</h4>
      </div>
    </div>
    <!-- changed from go to push, otherwise it acted like 'back' on browser controls -->
    <div class="container mb-3">
      <button @click="$router.push('/')">Main Menu</button>
    </div>
  

</div>

<!-- old image -->


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
      console.log("landmarkInfo is called");

      landmarkInfo.value = result.data;

      console.log("landmarkInfo ", landmarkInfo.value);
      console.log(landmarkInfo.value.title);
    }
    // call the above function
    getLandmark(this.$route.params.id);
    console.log(this.$route.params.id)
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
