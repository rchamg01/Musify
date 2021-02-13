import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    items: null,
    track: null,
  },
  mutations: {
    mutateUser(state, payload) {
      state.user = payload;
    },
    mutateTopArtists(state, payload) {
      state.items = payload;
    },
    mutateTopTracks(state, payload) {
      state.items = payload;
    },
    mutateTrackFeatures(state, payload) {
      state.track = payload;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getTopArtists(state) {
      return state.items;
    },
    getTopTracks(state) {
      return state.items;
    },
    getTrackFeatures(state) {
      return state.track;
    },
  },
  modules: {},
});
