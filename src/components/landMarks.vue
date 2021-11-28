<template>

  <header>
    <div
      class="p-5 text-center bg-image"
      style="
        background-image: url('https://i.pinimg.com/originals/61/70/db/6170db50b79ace81d424d37b66c6a9a7.jpg');
        height: 150px;
        width: 110%;
      "
    >
      <h1 class="mb-3">World landmarks</h1>
    </div>
  </header>


  <div class="container-fluid">
    <div class="row text-center">
      <div
        class="col-12 col-md-4 col-lg-3"
        v-for="landmark in landmarksFromServer"
        :key="landmark"
      >
        <div class="box mx-auto d-block">
          <router-link :to="`/landmark/${landmark.id}`" class="col">
            <div class="img-frame">
              <img
                class="mx-auto d-block"
                :src="landmark.imageUrl"
                alt="landmark image"
              />
            </div>
            <p class="title" id="title">{{ landmark.title }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- <Form @click="addNewLandmark($event)" /> -->
</template>

<script>
import { ref } from "vue";
import axios from "axios";
/* import Form from "@/components/landmarkForm.vue"; */
export default {
  components: {
    /* Form, */
  },
  name: "Form",
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

    // add new landmark

    async function addNewLandmark(input) {

      const headers = {
        "Content-Type": "application/json",
      };

      let data = {
        title: input.value,
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
  /* methods: {
    inputLandmark(FormData) {
      this.FormData = FormData;
    },
  }, */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mb-3 {
  font-size: 50px;
  color: peachpuff;
  text-shadow: 2px 2px 5px black;
  text-align: center;
}

.box {
  margin: 1em 0;
  text-align: center;
  border: 1px solid silver;
  border-radius: 0.5em;
  width: fit-content;
  padding: 0px;
  box-shadow: 5px 10px 8px silver;
  background: lightgrey;
}

.box img {
  width: 300px;
  height: 250px;
  object-fit: cover;
  border-radius: 0.5em 0.5em 0 0;
}

.title {
  margin-top: 5%;
  font-size: 1.4em;
  text-decoration: none;
  color: #454545;

}

a {
  text-decoration: none;
}
.container-fluid {
  padding-top: 20px;
  background-image: url("https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700422093.jpg");

}
</style>
