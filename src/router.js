import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import locale from "@/i18n/locale";

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
      path: "/:locale/mission/:slug",
      name: "mission",
      component: () => import("./views/Mission.vue")
    },
    {
      path: "/:locale/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "*",
      redirect: { path: `/${locale}` }
    }
  ]
});

export default router;
