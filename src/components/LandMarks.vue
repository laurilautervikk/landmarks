<template>
  <div class="layout">
    <header class="container-fluid banner">
      <div
        class="row d-flex justify-content-between align-items-center header-row"
      >
        <div class="col-sm-12 col col-md-12 col-lg-3 float-left">
          <div class="row m-3 justify-content-end">
            <button @click="$router.push('/login')" v-if="!token">Login</button>
            <button @click="$router.push('/register')" v-if="!token">
              Register
            </button>
            <button @click="logout" v-if="token">Logout</button>
          </div>
        </div>
        <div
          class="col col-xs-12 col-sm-12 col-md-12 col-lg-6 p-5 justify-content-center"
        >
          <h1 class="mb-3">World landmarks</h1>
        </div>
        <div class="text-center col-lg-3 col-md-12 col-sm-12 float-right">
          <!-- MODAL START -->
          <button
            class="align-middle btn btn-info m-1"
            @click="openModal"
            v-if="!showModal && token"
          >
            Add Landmark
          </button>
          <AddLandmark
            v-if="showModal"
            :showModal="showModal"
            @clicked="onChildClick"
          >
            <slot>
              <h3 class="modal-title">Add a Landmark</h3>
            </slot>
          </AddLandmark>
          <!-- MODAL END -->
        </div>
      </div>
    </header>

    <div class="container-fluid body-section">
      <div class="row my-3 justify-content-center">
        <div class="col-3">
          <h5>
            <input
              class="form-control search-box"
              placeholder="Type to search.."
              type="search"
              v-model="searchString"
              @input="debouncedSearchChanged"
              name="search"
            />
          </h5>
        </div>
      </div>
      <div class="row justify-content-center">
        <div
          class="col-auto p-3"
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
      <div class="container justify-content-center">
        <div class="row my-3 justify-content-center">
          <div class="col-3 text-center">
            <h5>
              <span>Records on page </span>
              <input
                class="number-input"
                v-model="newPageLimit"
                @change="recordsOnPageChanged"
                type="number"
                name="docsPerPage"
                min="1"
                :max="landmarksFromServerMeta.totalDocs"
              />
            </h5>
          </div>
          <div class="pagebox col-1 text-center">
            <h5 @click="prevPage">Prev</h5>
          </div>
          <div class="col-2 text-center">
            <h5>
              Page:<span>{{ landmarksFromServerMeta.page }}</span
              >/<span>{{ landmarksFromServerMeta.totalPages }}</span>
            </h5>
          </div>

          <div class="pagebox col-1 text-center">
            <h5 @click="nextPage">Next</h5>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import AddLandmark from "@/components/AddLandmark.vue";
import Footer from "@/components/Footer.vue";
import debounce from "lodash.debounce";

export default {
  name: "Landmarks",
  components: {
    AddLandmark,
    Footer,
  },
  props: {
    title: String,
    imageUrl: String,
    description: String,
  },

  setup() {
    const router = useRouter();
    let landmarksFromServer = ref([]);
    let landmarksFromServerMeta = ref([]);
    const newTitle = ref("");
    const newImageUrl = ref("");
    const newDescription = ref("");
    const showModal = ref(false);
    const token = ref(localStorage.getItem("token"));
    console.log("token: ", token);

    //pagination variables
    const newPageNumber = ref(1);
    const newPageLimit = ref(8);

    //Search variable
    const searchString = ref("");

    //GET request for a list of landmarks
    async function getLandmarks() {
      const params = {
        page: newPageNumber.value,
        limit: newPageLimit.value,
        searchFor: searchString.value,
      };
      console.log("params", params);
      const result = await axios
        .get("/api/get-landmarks", { params })
        .catch(function (error) {
          //This route is not auth
          if (error.response.status === 401) {
            router.push("/login");
          }
        });
      landmarksFromServer.value = result.data.docs; // Landmarks are inside docs, due to pagination
      landmarksFromServerMeta.value = result.data;
      console.log("Data from BE: ", result.data);
    }
    // call the above function

    //open modal
    function openModal() {
      showModal.value = true;
    }
    //close modal, reload landmarks
    async function onChildClick() {
      showModal.value = false;
      await getLandmarks();
    }

    //Pagination logic
    const nextPage = () => {
      if (newPageNumber.value >= landmarksFromServerMeta.value.totalPages) {
        console.log("No more pages to show");
      } else {
        newPageNumber.value++;
        console.log("next", newPageNumber.value);
        getLandmarks();
      }
    };

    const prevPage = () => {
      if (newPageNumber.value <= 1) {
        console.log("Can't go lower with pages");
      } else {
        newPageNumber.value--;
        console.log("prev", newPageNumber.value);
        getLandmarks();
      }
    };
    //records on page
    const recordsOnPageChanged = () => {
      getLandmarks();
    };
    //Pagination logic END

    //OLD search trigger
    let searchChanged = () => {
      getLandmarks();
    };

    const debouncedSearchChanged = debounce(searchChanged, 500);
    //Search DEBOUNCE END

    //log out the user
    const logout = async () => {
      localStorage.removeItem("token");
      console.log("Logged out, token removed");
      await getLandmarks();
      location.reload(); //not a good solution
      //router.push('/');
    };
    onMounted(() => {
      getLandmarks();
    });

    return {
      debouncedSearchChanged,
      searchChanged,
      searchString,
      recordsOnPageChanged,
      nextPage,
      prevPage,
      newPageNumber,
      newPageLimit,
      token,
      logout,
      openModal,
      onChildClick,
      showModal,
      landmarksFromServer,
      landmarksFromServerMeta,
      newTitle,
      newImageUrl,
      newDescription,
    };
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
.banner {
  background-image: url("https://i.pinimg.com/originals/61/70/db/6170db50b79ace81d424d37b66c6a9a7.jpg");
  min-height: fit-content;
  width: 100vw;
}

button {
  height: 50px;
  width: fit-content;
  margin: 0.5em;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 0.5em;
  font-weight: 600;
  cursor: pointer;
}

.number-input {
  border-radius: 0.5em;
  height: 30px;
  width: 50px;
  text-align: center;
  border: 1px solid #454545;
}

.search-box {
  border-radius: 0.5em;
  height: 50px;
  border: 1px solid #454545;
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

/* div {
  border: 1px solid red;
} */

.pagebox {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: black;
  border-radius: 0.5em;
  cursor: pointer;
  height: 30px;
}
</style>
