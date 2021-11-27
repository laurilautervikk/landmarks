<template>
  <div class="modal" v-if="showModal">
    <div v-if="showModal" class="modal-content">
      <div class="modal-body">
        <div class="d-flex justify-content-end">
          <button @click="closeModal">X</button>
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
              <button
                @click="sendData"
                type="submit"
                class="btn btn-primary w-100 mt-1"
              >
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
export default {
  name: "AddLandmark",
  props: {
    showModal: Boolean,
    title: String,
    imageUrl: String,
    description: String,
  },
  data() {
    const newTitle = ref("");
    const newImageUrl = ref("");
    const newDescription = ref("");


    const data = {
      title: newTitle.value,
      imageUrl: newImageUrl.value,
      description: newDescription.value,
    };

    
    console.log('data raw ', data)

    return {
      data,
      newTitle,
      newImageUrl,
      newDescription,
    };
  },
  methods: {
    closeModal() {
      this.$emit("clicked");
    },
    sendData(data) {
      this.$emit("sendStuff", data.value);
      console.log("sendStuff ", data.value);
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
</style>
