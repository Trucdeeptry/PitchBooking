import { createStore } from "vuex";
import pitch from "./pitch";
import booking from "./booking.js";
import profile from "./profile";
import auth from "./auth.js";
const store = createStore({
  modules: {
    pitch,
    profile,
    booking,
    auth,
  },
  state() {},
  mutations: {},
  getters: {},
  actions: {},
});

export default store;
