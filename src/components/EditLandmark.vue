<template>
  <div class="modal" v-if="showModal">
    <div v-if="showModal" class="modal-content">
      <div class="modal-body px-4">
        <div class="d-flex justify-content-between">
          <h3 class="px-5 pt-3 mb-0 align-bottom">Edit this landmark</h3>
          <div @click="closeModal" class="pointer align-top">
            <i class="align-top fs-2 bi bi-x-circle"></i>
          </div>
        </div>

        <!-- START -->
        <div class="container py-4">
          <input
            v-model="newTitle"
            type="text"
            name="title"
            class="form-control"
            required
          />

          <div class="input-group">
            <input
              v-model="newUrl"
              type="url"
              class="form-control"
              placeholder="Image URL"
              required
            />
            <div
              @click="addImage(newUrl)"
              class="plus-box btn btn-outline-secondary btn-height"
              type="button"
              :disabled="newUrl.length == 0"
            >
              <i class="plus fs-2 bi bi-plus text-dark"></i>
            </div>
          </div>

          <div class="container">
            <div id="thumb-row" class="row d-flex flex-wrap">
              <div
                class="image-box col-6 col-sm-6 col-md-4 col-lg-3"
                v-for="(image, index) in newImageUrlSet"
                :key="image"
              >
                <img
                  class="tiny-image img-thumbnail"
                  :src="image"
                  alt="this image is missing"
                />
                <div
                  @click="deleteThumbnail(index)"
                  class="delete"
                  type="button"
                >
                  <i class="fs-2 bi bi-trash"></i>
                </div>
              </div>
            </div>
          </div>

          <textarea
            v-model="newDescription"
            class="form-control"
            id="description"
            name="description"
            style="height: 10em"
            required
          ></textarea>

          <button
            @click="editLandmark"
            type="submit"
            class="homemade-button w-100 mt-1"
          >
            Save It
          </button>
        </div>

        <!-- END -->
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "AddLandmark",
  props: {
    showModal: Boolean,
  },

  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    let landmarkInfo = ref([]);
    let newUrl = ref("");
    let newTitle = ref("");
    let newImageUrlSet = ref([]);
    let newDescription = ref("");

    //GET request for a single landmark
    async function getLandmark(id) {
      const result = await axios.get(`/api/get-landmark/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("landmarkInfo is called");
      landmarkInfo.value = result.data;
      console.log("landmarkInfo received: ", landmarkInfo.value);
      console.log(landmarkInfo.value.title);
      //prefill the inputs with DB info
      newTitle.value = landmarkInfo.value.title;
      newImageUrlSet.value = landmarkInfo.value.imageUrlSet;
      newDescription.value = landmarkInfo.value.description;
    }
    // call the above function
    getLandmark(route.params.id);

    //build image array
    function addImage(input) {
      console.log("trying to insert: ", input);
      if (input) {
        this.newImageUrlSet.push(input);
        this.newUrl = "";
        console.log("newImageUrlSet: ", this.newImageUrlSet);
      } else {
        console.log("Image URL not inserted");
      }
    }

    //delete a thimbnail from the image array
    function deleteThumbnail(input) {
      console.log("this.newImageUrlSet before delete: ", this.newImageUrlSet);
      console.log("input: ", input);
      this.newImageUrlSet = this.newImageUrlSet.filter((image, index) => {
        console.log("this.newImageUrlSet after filter: ", this.newImageUrlSet);
        if (index !== input) {
          return image;
        }
      });
    }

    //edit a landmark
    async function editLandmark() {
      let id = route.params.id;
      let data = {
        title: this.newTitle,
        imageUrlSet: this.newImageUrlSet,
        description: this.newDescription,
      };
      console.log("Data from modal: ", data);
      await axios
        .patch(`/api/edit-landmark/${id}`, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          context.emit("clicked");
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            //console.log("directing to login ");
            router.push("/login");
          }
        });
    }

    //emit close modal to parent
    const closeModal = () => {
      context.emit("clicked");
    };

    return {
      landmarkInfo,
      newUrl,
      newTitle,
      newImageUrlSet,
      newDescription,
      addImage,
      deleteThumbnail,
      editLandmark,
      closeModal,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 100%;
  height: fit-content;
  max-height: 100%;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 0.5em;
}

.pointer {
  cursor: pointer;
}

.modal-content {
  border: none;
}

.homemade-button {
  height: 50px;
  width: fit-content;
  margin-top: auto;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 0.5em;
  font-weight: 600;
}

.form-control {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

button {
  margin-top: 0em;
  margin-bottom: 0em;
}

.btn-height {
  margin-top: 8px;
  height: 38px;
  border: 0px;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
}

.tiny-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px 5px;
}

.plus-box {
  position: relative;
  width: 2.5em;
}

.plus {
  margin: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.image-box {
  position: relative;
}

div.image-box:hover img {
  opacity: 0.3;
}
div.image-box:hover div {
  position: absolute;
  display: block;
}
div.image-box div {
  display: none;
}
div.image-box div.delete {
  top: 35px;
  right: 35px;
}
</style>
