<template>
  <div>
    <header>
      <div
        class="row d-flex justify-content-between align-items-center"
        style="
          background-image: url('https://i.pinimg.com/originals/61/70/db/6170db50b79ace81d424d37b66c6a9a7.jpg');
          min-height: 15%;
          width: 100%;
        "
      >
        <div
          class="d-none d-md-block col-sm-12 col col-md-12 col-lg-3 float-left"
        ></div>
        <div
          class="
            col col-xs-12 col-sm-12 col-md-12 col-lg-6
            p-5
            justify-content-center
          "
        >
          <h1 class="mb-3">World landmarks</h1>
        </div>
        <div
          class="
            justify-content-center
            col-lg-3 col-md-12 col-sm-12
            float-right
          "
        >
          <!-- MODAL START -->
          <button class="align-middle btn btn-info" @click="openModal" v-if="!showModal">
            Add Landmark
          </button>
          <AddLandmark
            v-if="showModal"
            :showModal="showModal"
            @clicked="onChildClick"
            @insertClicked="receiveData"
          >
            <slot>
              <h3 class="modal-title">Add a Landmark</h3>
            </slot>
          </AddLandmark>
          <!-- <AddLandmark @insertClicked="receiveData" /> -->
          <!-- MODAL END -->
        </div>
      </div>
    </header>

    <div class="container-fluid">
      <div class="row justify-content-center">
        <div
          class="col-auto"
          v-for="landmark in landmarksFromServer"
          :key="landmark"
        >
          <div class="box mx-auto d-block">
            <router-link :to="`/landmark/${landmark._id}`" class="col">
              <div class="img-frame">
                <img
                  class="mx-auto d-block"
                  :src="landmark.imageUrlSet[0]"
                  alt="landmark image"
                />
              </div>
              <p class="title" id="title">{{ landmark.title }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import AddLandmark from "@/components/AddLandmark.vue";
export default {
  name: "Landmarks",
  components: {
    AddLandmark,
  },
  props: {
    title: String,
    imageUrl: String,
    description: String,
  },

  data() {
    //const newLandmark = ref("");
    let landmarksFromServer = ref([]);
    const newTitle = ref("");
    const newImageUrl = ref("");
    const newDescription = ref("");

    //GET request for a list of landmarks
    async function getLandmarks() {
      const result = await axios.get("/api/get-landmarks");
      landmarksFromServer.value = result.data;
      console.log("landmarksFromServer ", landmarksFromServer.value);
    }
    // call the above function
    getLandmarks();

    // add new landmark

    return {
      showModal: false,
      landmarksFromServer,
      newTitle,
      newImageUrl,
      newDescription,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    onChildClick() {
      this.showModal = false;
    },
    receiveData(value) {
      this.data = value;
      console.log("data from child event: ", value);
    },
  },
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

  /* background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgb(49, 124, 158) 50%,
    rgba(20, 71, 129, 1) 100%
  ); */
}

button {
  height: 50px;
  width: fit-content;
  margin-top: auto;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 0.5em;
  font-weight: 600;
}

/* div {
  border: solid 1px red;
} */
</style>
