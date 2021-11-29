<template>
  <div class="modal" v-if="showModal">
    <div v-if="showModal" class="modal-content">
      <div class="modal-body">
        <div class="d-flex justify-content-end">
          <div @click="closeModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>

        <!-- START -->
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-12">
              <label for="title">Title</label>
              <input
                v-model="newTitle"
                type="text"
                name="title"
                class="form-control"
                required
              />
              <label for="imageUrl">Image URL</label>
              <input
                v-model="newImageUrl"
                type="text"
                name="imageUrl"
                class="form-control"
              />
              <label for="description">Description</label>
              <input
                v-model="newDescription"
                type="text"
                name="description"
                class="form-control"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-12">
              <br />
              <button @click="addNewLandmark" type="submit" class="w-100 mt-1">
                Add new Landmark
              </button>
            </div>
          </div>
        </div>
        <!-- END -->
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
export default {
  name: "AddLandmark",
  props: {
    showModal: Boolean,
    /* title: String,
    imageUrl: String,
    description: String, */
  },
  data() {
    const newTitle = ref("");
    const newImageUrl = ref("");
    const newDescription = ref("");

    /* function sendData(input) {
      this.$emit("insertClicked", input);
    } */

    return {
      newTitle,
      newImageUrl,
      newDescription,
    };
  },
  methods: {
    async addNewLandmark() {
      let data = {
        title: this.newTitle,
        imageUrl: this.newImageUrl,
        description: this.newDescription,
      };

      console.log(data);

      await axios
        .post("/api/add-landmark", data)
        .then((res) => {
          console.log(res);
          this.closeModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    closeModal() {
      this.$emit("clicked");
    },
  },
};
</script>
<style>
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

button {
  height: 50px;
  width: fit-content;
  margin-top: auto;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  border: none;
  border-radius: 0.5em;
  font-weight: 600;
}
</style>
