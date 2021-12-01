import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Detail from "@/views/Detail.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Detailview from "@/components/Detailview.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
    path: "/landmark",
    name: "Detail",
    component: Detail,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "/landmark/:id",
        name: "Detailview",
        component: Detailview,
        meta: {
          auth: true,
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


// GOOD - infinite loop
/* router.beforeEach((to, from, next) => {
  if (to.meta.auth !== 'Login' && !localStorage.getItem("token")) next({ name: 'Login' })
  else next()
  console.log("Token still fresh");
}); */


//this gives a warning of double next() in some cases
router.beforeEach((to, from, next) => {
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
  console.log("Token still fresh");
});




export default router;
