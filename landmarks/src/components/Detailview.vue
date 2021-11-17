<template>
  <div class="row">
            <h1>Landmark name</h1>
    </div>

        <div class="row">
            <img src="https://www.worldatlas.com/r/w1200/upload/56/fb/ee/alaska-mountain-range-csnafzger.jpg"
                alt="mountain">


            <div class="col-sm">
                <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio eveniet optio aspernatur vitae eos laboriosam voluptates architecto ducimus error, laborum recusandae. Omnis, magni molestias quisquam beatae impedit cupiditate quam commodi!</h4>

            </div>
        </div>
      
     
      <button @click="$router.go(-1)">Main Menu</button>

</template>

<script>

</script>

    
<style scoped>

h1{
  margin-top: 30px;
}

img {
  height: 500px;
  width: 700px;
  margin-top: 50px;
  margin-right: 30px;
  margin-left: 30px;
}

.col-sm {
  
  padding-top: 200px;
}

button {
  float: right;
  margin-right: 20px;
}

</style>




