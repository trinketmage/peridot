import Vue from "vue";
import App from "./App.vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);
import router from "./router";
import store from "./store/index";
import messages from "@/i18n/index";

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "fr",
  messages
});

router.beforeEach((to, from, next) => {
  // ...
  i18n.locale = to.params.locale;
  next();
});
new Vue({
  data: store,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
