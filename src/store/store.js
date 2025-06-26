import { createStore } from "vuex";
import pitch from "./pitch";
import booking from "./booking.js";
import profile from "./profile";
const store = createStore({
  modules: {
    pitch,
    profile,
    booking,
  },
  state() {},
  mutations: {},
  getters: {},
  actions: {},
});

export default store;
