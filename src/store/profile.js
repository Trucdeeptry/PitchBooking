import supabase from "../composables/supabase";
export default {
  namespaced: true,
  state() {
    return {};
  },
  mutations: {},
  getters: {},
  actions: {
    async createProfiles(_, { full_name, phone, email }) {
      await supabase.auth.signInAnonymously();
      const { data, error } = await supabase
        .from("profiles")
        .insert([
          {
            full_name,
            phone,
            email,
          },
        ])
        .select();

      if (error) {
        console.error("Lỗi khi insert:", error);
      } else {
        return data[0];
      }
    },
    async isExistsPhone(_, phone) {
      let { data, error } = await supabase.rpc("phone_exists", {
        input_phone: phone,
      });
      if (error) console.error(error);
      else return data;
    },
  },
};
