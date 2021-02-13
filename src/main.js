import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router/router";
import store from "./store/store";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import MenuButtons from "./components/MenuButtons.vue";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

Vue.component("menu-buttons", MenuButtons);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  return next();
});

new Vue({
  router,
  methods: {
    setAccessToken(token) {
      this.access_token = token;
    },
    getAccessToken() {
      return this.access_token;
    },
    setRefreshToken(refreshToken) {
      this.refresh_token = refreshToken;
    },
    getRefreshToken() {
      return this.refresh_token;
    },
  },

  data: () => ({
    access_token: "",
    refresh_token: "",
  }),
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
