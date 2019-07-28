import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/:locale(en|fr)",
      name: "home",
      component: Home
    },
    {
      path: "/:locale/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "*",
      redirect: { path: "/en" }
    }
  ]
});

export default router;
