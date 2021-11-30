<template>
  <div class="container-fluid body-section py-3">
    <div class="row text-center my-3">
      <h1>{{ landmarkInfo.title }}</h1>
    </div>


    <div class="row mx-3 image-text-box">
      <div class="col-12 col-lg-7 col-md-12 col-sm-12 margin-fix">
        <div class="card-image">
          <!-- <div class="card" v-for="i in landmarkInfo.imageUrlSet" :key="i">
          <img :src="i" alt="landmark image" /> -->
          <!-- </div> -->

          <!-- SLIDER START -->

          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div
                class="carousel-item active"
                v-for="i in landmarkInfo.imageUrlSet"
                :key="i"
              >
                <img class="d-block w-100" :src="i" alt="First slide" />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

          <!-- SLIDER END -->
        </div>

      </div>

      <div class="col-12 col-lg-5 col-md-12 col-sm-12 d-flex align-items-center">
        <div class="cardtext m-2">
          <h4>{{ landmarkInfo.description }}</h4>
        </div>
      </div>
    </div>
    <!-- changed from go to push, otherwise it acted like 'back' on browser controls -->

    <div class="row m-3 justify-content-end">
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

    console.log(this.$route.params.id);

    return {
      landmarkInfo,
    };
  },
};
</script>

<style scoped>


.body-section {
  background: rgb(30, 177, 235);
  background: radial-gradient(
    circle,
    rgb(58, 161, 192) 0%,
    rgb(25, 95, 128) 50%,
    rgba(20, 71, 129, 1) 100%
  );
  min-height: 80vh;
  /* margin-top: -30px; */
}


.image-text-box {
  border: 1px solid rgb(192, 192, 192);
  border-radius: 0.5em;
  width: fit-content;
  padding: 0px;
  box-shadow: 3px 5px 5px rgb(26, 46, 65);
}


.margin-fix {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.card-image {
  border-radius: 0.5em;
  height: auto;
  width: fit-content;
}


.card-image img {
  object-fit: cover;
  height: 500px;
  width: 700px;
  /* border-radius: 0.5em; */
}


h1 {
  color: azure;
}

h4 {
  height: 100%;
  width: 100%;
  color: #ffffff;
  text-align: center;
  padding-right: 15px;
  padding-left: 15px;
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

/* big screen */
@media only screen and (min-width: 992px) {
    .card-image img {
      border-radius: 0.5em 0em 0em 0.5em;
  }
}
/* small screen */
@media only screen and (max-width: 992px) {
    .card-image img {
      border-radius: 0.5em 0.5em 0em 0em;
  }
}

/* div {
  border: 1px solid white;
} */
</style>
