
<template>
  <div class="hello">

<div align="center">
  <table class="table">
    <thead>
    <tr>
      <th>landmark1</th>
      <th>landmark2</th>
      <th>landmark3</th>
    </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ User.landmark1 }}</td>
        <td>{{ User.landmark2 }} </td>
        <td>{{ User.landmark3 }}</td>
      </tr>
    </tbody>
  </table>
  </div> 

  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: "HelloWorld",
data () {
  return {
User :{},
  }
},
 mounted() {
   axios.get ('http://localhost:3000/')
   .then((response) => {

     console.log(response.data);
     this.User = response.data;
   })
   .catch((error) => {
     console.log(error);
   })
 },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
