<template>
  <div>
    <div class="container mt-3 mb-5">
      <div class="row justify-content-between">
        <div
          v-show="userComments.length !== 0"
          class="col-lg-6 col-sm-12 col-md-12 col-12"
        >
          <h1>Comments</h1>

          <div class="comments justify-content-center pb-3">
            <ul class="comment-list p-3 my-1">
              <li
                class=""
                v-for="comment in userComments.slice().reverse()"
                :key="comment._id"
              >
                <div class="comment-item darker my-2">
                  <h4>Name: {{ comment.userName }}</h4>
                  <br />
                  <span>{{ formatDate(comment.createdAt) }}</span>
                  <br />
                  <span>E-mail: {{ comment.userEmail }}</span>
                  <br />
                  <p>
                    {{ comment.commentBody }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-show="userComments.length === 0"
          class="col-lg-6 col-sm-12 col-md-12 col-12 pb-4"
        >
          <h1>No comments</h1>
        </div>

        <div
          class="comment-form col-lg-6 col-sm-12 col-md-12 col-12 justify-content-center"
        >
          <form ref="commentForm" @submit="addComment()" id="algin-form">
            <div class="form-group">
              <h4>Leave a comment</h4>
              <label for="message">Comment</label>
              <textarea
                name="msg"
                id=""
                cols="30"
                rows="5"
                class="form-control"
                v-model="commentData.comment.commentBody"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                v-model="commentData.comment.userName"
                type="text"
                name="name"
                id="fullname"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="commentData.comment.userEmail"
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
//import { refs } from "vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "commentData",
  props: ["userComments"],
  data() {
    return {
      commentData: {
        comment: {
          userId: 1,
          userName: "",
          userEmail: "",
          commentBody: "",
        },
      },
    };
  },
  methods: {
    async addComment() {
      let commentData = this.commentData;
      console.log("commentData ", this.commentData);
      this.$refs.commentForm.reset();
      const id = this.$route.params.id;
      const self = this;

      //add a comment
      await axios
        .post(`/api/add-comment/${id}`, commentData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(function (request) {
          console.log(request);
          console.log("emit update comments to parent");
          //self.$refs.commentForm.reset();
          self.$emit("commented");
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    formatDate(input) {
      return moment(input).format("DD.MM.YYYY HH:MM:SS");
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

.darker {
  border: 1px solid #ecb21f;
  background-color: black;
  float: right;
  border-radius: 5px;
  padding-left: 40px;
  padding-right: 30px;
  padding-top: 10px;
}
.comments {
  border: 1px solid rgba(16, 46, 46, 1);
  background-color: rgba(16, 46, 46, 0.973);
  /* float: left; */
  border-radius: 5px;
  min-width: 100%;
  display: inline-block;
}

.comment-list {
  list-style: none;
}

.comment-item {
  min-width: 100%;
}

.comment-form {
  margin-top: 3.5em;
  max-height: 26em;
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
h4,
h3 {
  color: white;
  font-weight: bold;
}
label {
  color: rgb(212, 208, 208);
}
#align-form {
  min-width: 100%;
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
