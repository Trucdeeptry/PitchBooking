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
      const { data, error } = await supabase.from("booking").insert([
        {
          full_name,
          phone,
          email,
        },
      ]);

      if (error) {
        console.error("Lỗi khi insert:", error);
      } else {
        console.log("Thêm thành công:", data);
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
