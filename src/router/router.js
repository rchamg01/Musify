import Vue from "vue";
import Router from "vue-router";

const User = () => import("@/views/User");
const Login = () => import("@/views/Login");
const Principal = () => import("@/views/Principal");
const Estadisticas = () => import("@/views/Stats");
const EstadisticasSongs = () => import("@/views/StatsSongs");
const Features = () => import("@/views/Features");
const Search = () => import("@/views/Search");
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Login,
      props: true,
      meta: {
        title: "Musify",
      },
    },
    {
      path: "/principal",
      name: "Principal",
      component: Principal,
      props: true,
      meta: {
        title: "Musify",
      },
    },
    {
      path: "/user",
      name: "Usuario",
      component: User,
      props: true,
      meta: {
        title: "Musify",
      },
    },
    {
      path: "/stats",
      name: "Estadisticas",
      component: Estadisticas,
      props: true,
      meta: {
        title: "Musify",
      },
    },
    {
      path: "/statsSongs",
      name: "EstadisticasS",
      component: EstadisticasSongs,
      props: true,
      meta: {
        title: "Musify",
      },
    },
    {
      path: "/features",
      name: "Cualidades de la música",
      props: true,
      component: Features,
      meta: {
        title: "Musify",
      },
    },
    {
      path: "/search",
      name: "Búsqueda de música",
      props: true,
      component: Search,
      meta: {
        title: "Musify",
      },
    },
  ],
});
