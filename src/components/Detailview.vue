<template>
  <div class="layout">
    <div class="container-fluid body-section py-3">
      <div class="row ms-0 mx-3 justify-content-between">
        <div
          class="btn-back mt-1 mb-3 d-inline-flex align-items-center"
          @click="$router.push('/')"
        >
          <i class="bi bi-arrow-left fs-2"></i>
        </div>
        <div class="col-12 col-lg-6 d-flex justify-content-end">
          <button
            class="align-middle btn btn-info m-1"
            @click="openModal"
            v-if="!showModal && token"
          >
            Edit
          </button>
          <button
            class="align-middle btn btn-info m-1"
            @click="deleteLandmark"
            v-if="!showModal && token"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="row text-center mt-2 my-3">
        <h1>{{ landmarkInfo.title }}</h1>
      </div>

      <div class="row d-flex justify-content-center mb-5">
        <div
          class="row btn-row m-3 justify-content-center justify-content-lg-end"
        >
          <!-- MODAL START -->
          <EditLandmark
            v-if="showModal"
            :showModal="showModal"
            @clicked="onChildClick"
          >
            <slot>
              <h3 class="modal-title">Edit this Landmark</h3>
            </slot>
          </EditLandmark>
          <!-- MODAL END -->
        </div>

        <div class="row mx-3 image-text-box">
          <div
            class="col-12 col-lg-7 col-md-12 col-sm-12 margin-fix card-image-box-outer"
          >
            <!-- SLIDER START -->
              <div class="card-image-box">
                <img :src="images[currentNumber]" alt="landmark image" />

                <div class="btnNext float-end me-1" @click="next">
                  <i class="bi bi-arrow-right fs-1"></i>
                </div>
                <div class="btnPrev float-start ms-1" @click="prev">
                  <i class="bi bi-arrow-left fs-1"></i>
                </div>
                </div>
          </div>
          <!-- SLIDER END -->
          <div
            class="col-12 col-lg-5 col-md-12 col-sm-12 d-flex align-items-center"
          >
            <div class="cardtext m-2">
              <h4>{{ landmarkInfo.description }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <!-- old image -->
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import EditLandmark from "@/components/EditLandmark.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Detailview",
  components: {
    EditLandmark,
    Footer,
  },
  props: {
    id: Number,
    title: String,
    imageUrl: String,
    description: String,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const landmarkInfo = ref([]);
    const currentNumber = ref(0);
    const images = ref([]);
    const imagesLenght = computed(() => images.value.length);
    const token = ref(localStorage.getItem("token"));
    const showModal = ref(false);
    const id = route.params.id;

    //GET request for a single landmark
    async function getLandmark(id) {
      const result = await axios.get(`/api/get-landmark/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("FE getLandmark is called");
      landmarkInfo.value = result.data;
      images.value = landmarkInfo.value.imageUrlSet;
    }
    // call the above function
    getLandmark(route.params.id);

    //Delete landmark
    function deleteLandmark() {
      axios
        .delete(`/api/delete-landmark/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("Landmarke Delete returned BE -> FE", response);
          //Send back to main page
          router.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    //Slider next, previous logic
    function next() {
      if (currentNumber.value == imagesLenght.value - 1) {
        currentNumber.value = 0;
      } else {
        currentNumber.value += 1;
      }
    }
    function prev() {
      if (currentNumber.value == 0) {
        currentNumber.value = imagesLenght.value - 1;
      } else {
        currentNumber.value -= 1;
      }
    }

    //open modal
    function openModal() {
      showModal.value = true;
    }
    //close modal, reload landmarks
    async function onChildClick() {
      showModal.value = false;
      await getLandmark(id);
    }
    onMounted(() => {
      console.log("token: ", token);
    });
    return {
      deleteLandmark,
      landmarkInfo,
      token,
      openModal,
      onChildClick,
      showModal,
      next,
      prev,
      images,
      currentNumber,
      imagesLenght,
    };
  },
};
</script>

<style scoped>
.btnNext,
.btnPrev{
  color: #2ab1ce;
}
.card-image-box .btnPrev {
  position: absolute;
  top: 45%;
  left: 0%;
  cursor: pointer;
}

.card-image-box .btnNext {
  position: absolute;
  top: 45%;
  right: 0%;
  cursor: pointer;
}

div.image-box div.delete {
  top: 35px;
  right: 35px;
}
.image-text-box {
  border: 1px solid rgb(192, 192, 192);
  border-radius: 0.5em;
  width: fit-content;
  max-width: 80vw;
  padding: 0px;
  box-shadow: 3px 5px 5px rgb(26, 46, 65);
}
.btn-row {
  max-width: 80vw;
}
.margin-fix {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.card-image-box-outer {
  height: 60vh;
}

.card-image-box {
  width: 100%;
  height: 100%;
  text-align: center;
  object-fit: cover;
  position: relative;
}

.card-image-box img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}

h1 {
  color: azure;
}

h4 {
  color: #ffffff;
  text-align: center;
  padding-right: 15px;
  padding-left: 15px;
}
button {
  margin: 20px 20px;
  height: 50px;
  width: 200px;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-back {
  height: 50px;
  width: 50px;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-back i {
  -ms-transform: translate(-0%, -0%);
  transform: translate(-10%, -10%);
}

/* big screen */
@media only screen and (min-width: 992px) {
  .card-image-box img {
    border-radius: 0.5em 0em 0em 0.5em;
  }
}
/* small screen */
@media only screen and (max-width: 992px) {
  .card-image-box img {
    border-radius: 0.5em 0.5em 0em 0em;
  }
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
