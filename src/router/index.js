import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Detail from "@/views/Detail.vue";
import Detailview from "@/components/Detailview.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/landmark",
    name: "Detail",
    component: Detail,
    children: [
      {
        path: "/landmark/:id",
        name: "Detailview",
        component: Detailview,
      },
    ],
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

export default router;
