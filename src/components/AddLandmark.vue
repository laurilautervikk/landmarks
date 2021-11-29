<template>
  <div class="modal" v-if="showModal">
    <div v-if="showModal" class="modal-content">
      <div class="modal-body px-4">
        <div class="d-flex justify-content-between">
          <h3 class="px-5 pt-3 mb-0 align-bottom">Add a new landmark</h3>
          <div @click="closeModal" class="align-top">
            <i class="align-top fs-2 bi bi-x-circle"></i>
          </div>
        </div>

        <!-- START -->
        <div class="container py-4">
          <input
            v-model="newTitle"
            type="text"
            name="title"
            placeholder="Title"
            class="form-control"
            required
          />

          <div class="input-group">
            <input type="text" class="form-control" placeholder="Image URL" />
            <div class="btn btn-outline-secondary btn-height" type="button">
              <i class="mt-auto bi bi-plus-square text-dark"></i>
            </div>
          </div>

          <div class="container">No images inserted</div>

          <textarea
            v-model="newDescription"
            class="form-control"
            id="description"
            name="description"
            placeholder="Description goes here"
            style="height: 10em"
          ></textarea>

          <button
            @click="addNewLandmark"
            type="submit"
            class="homemade-button w-100 mt-1"
          >
            Add It
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
</style>
