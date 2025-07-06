import supabase from "../composables/supabase";
export default {
  namespaced: true,
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    async signIn({ commit }, { email, password }) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new Error(`Sign in failed: ${error.message}`);
      } else {
        commit("setUser", data.user);
        return data.user;
      }
    },
  },
};
