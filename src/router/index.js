import { createRouter, createWebHistory } from "vue-router";
import LandMarks from "@/components/LandMarks.vue";
import Detail from "@/views/Detail.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Detailview from "@/components/Detailview.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "LandMarks",
    component: LandMarks,
    meta: {
      auth: false,
    },
  },
  {
    path: "/landmark",
    name: "Detail",
    component: Detail,
    meta: {
      auth: false,
    },
    children: [
      {
        path: "/landmark/:id",
        name: "Detailview",
        component: Detailview,
        meta: {
          auth: false,
        },
      },
    ],
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


// GOOD
router.beforeEach((to, from, next) => {
  if (to.meta.auth === true && !localStorage.getItem("token")) next({ route: '/' }) //Might be set to '/login' as well
  else next()
  console.log("Login logic passed");
});


//this gives a warning of double next() in some cases
/* router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      console.log('Login needed')
      next({ name: "Login" });
    }
  } else {
    next();
  }
  console.log("Token check block");
}); */




export default router;
