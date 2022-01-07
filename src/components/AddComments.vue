<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-5 col-md-6 col-12 pb-4">
          <h1>Comments</h1>
          <div class="comment mt-4 text-justify float-left">
            <h4>{{ commentData.userName }}</h4>
            <br />
            <span>E-mail: {{ commentData.email }}</span> <br />
            <p>
              {{ commentData.comment }}
            </p>
          </div>
          <div class="text-justify darker mt-4 float-right">
            <h4>Rob Simpson</h4>
            <span>- 20 October, 2018</span> <br />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus numquam assumenda hic aliquam vero sequi velit molestias
              doloremque molestiae dicta?
            </p>
          </div>
          <div class="comment mt-4 text-justify">
            <h4>Jhon Doe</h4>
            <span>- 20 October, 2018</span> <br />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus numquam assumenda hic aliquam vero sequi velit molestias
              doloremque molestiae dicta?
            </p>
          </div>
          <div class="darker mt-4 text-justify">
            <h4>Rob Simpson</h4>
            <span>- 20 October, 2018</span> <br />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusamus numquam assumenda hic aliquam vero sequi velit molestias
              doloremque molestiae dicta?
            </p>
          </div>
        </div>

        <div
          class="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4"
        >
          <form @submit="addComment()" id="algin-form">
            <div class="form-group">
              <h4>Leave a comment</h4>
              <label for="message">Comment</label>
              <textarea
                name="msg"
                id=""
                cols="30"
                rows="5"
                class="form-control"
                v-model="commentData.comment"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                v-model="commentData.userName"
                type="text"
                name="name"
                id="fullname"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="commentData.email"
                type="text"
                name="email"
                id="email"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <button @click="addComment" type="button" id="post" class="btn">
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Vue from "Vue"
//import { ref } from "vue";
//import { useRoute } from "vue-router";
import axios from "axios";
//import { request } from 'express';
export default {
  name: "commentData",
  data() {
    return {
      commentData:
        {
          comment: "",
          userName: "",
          email: "",
        },
    };
  },
  methods: {
    addComment() {
      const commentData = this.commentData;
      //const commentbody = commentData.value;
      console.log(this.commentData)
      const id = this.$route.params.id;
      //const commentData = this.$route.params.commentData;
      axios
        .post(`/api/edit-landmark/${id}`, commentData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(function (request) {
          console.log(request);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#clicked {
  padding-top: 1px;
  padding-bottom: 1px;
  text-align: center;
  width: 100%;
  background-color: #ecb21f;
  border-color: #a88734 #9c7e31 #846a29;
  color: black;
  border-width: 1px;
  border-style: solid;
  border-radius: 13px;
}

#profile {
  background-color: unset;
}

#post {
  margin: 10px;
  padding: 6px;
  padding-top: 2px;
  padding-bottom: 2px;
  text-align: center;
  background-color: #2ab1ce;
  border-color: #a88734 #9c7e31 #846a29;
  color: black;
  border-width: 1px;
  border-style: solid;
  border-radius: 13px;
  width: 50%;
}

body {
  background-color: black;
}

#nav-items li a,
#profile {
  text-decoration: none;
  color: rgb(224, 219, 219);
  background-color: black;
}

.comments {
  margin-top: 5%;
  margin-left: 20px;
}

.darker {
  border: 1px solid #ecb21f;
  background-color: black;
  float: right;
  border-radius: 5px;
  padding-left: 40px;
  padding-right: 30px;
  padding-top: 10px;
}

.comment {
  border: 1px solid rgba(16, 46, 46, 1);
  background-color: rgba(16, 46, 46, 0.973);
  float: left;
  border-radius: 5px;
  padding-left: 40px;
  padding-right: 30px;
  padding-top: 10px;
}

.comment h4,
.comment span,
.darker h4,
.darker span {
  display: inline;
}

.comment p,
.comment span,
.darker p,
.darker span {
  color: rgb(184, 183, 183);
}

h1,
h4 {
  color: white;
  font-weight: bold;
}

label {
  color: rgb(212, 208, 208);
}

#align-form {
  margin-top: 20px;
}

.form-group p a {
  color: white;
}

.form-group input,
.form-group textarea {
  color: white;
  background-color: black;
  border: 1px solid rgba(16, 46, 46, 1);
  border-radius: 12px;
}

form {
  border: 1px solid rgba(16, 46, 46, 1);
  background-color: rgba(16, 46, 46, 0.973);
  border-radius: 5px;
  padding: 20px;
}
</style>
