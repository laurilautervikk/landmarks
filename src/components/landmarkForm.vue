<template>
  <div class="Popup">
    <div class="Popup-inner">
     
        <slot>
      <form>
        <label>Landmark name:</label>
        <input type="landmarkName" required v-model="landmarkName" />
 
        <label>Picture url:</label>
        <input type="url" required v-model="url" />

        <label>Description:</label>
        <input type="description" required v-model="description" />
        <button @click="isHidden = true">Submit Landmark</button>

      </form>
        </slot>
      <!-- <p>landmark Name: {{ landmarkName }}</p>
    <p>Url: {{ url }}</p>
    <p>Description: {{ description }}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  Data() {
    return {
      landmarkName: "",
      url: "",
      description: "",
      FormData,
    };
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-content: center;
  justify-content: center;
}
.popup-inner {
  background: #fff;
  padding: 32px;
}

form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px solid;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  page-break-after: auto;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
button{
  border-radius: 5px;
  background-color: green;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>
