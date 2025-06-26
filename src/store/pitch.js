import supabase from "../composables/supabase";
export default {
  namespaced: true,
  state() {
    return {};
  },
  mutations: {},
  getters: {},
  actions: {
    async getAllPitch() {
      try {
        const response = await supabase.rpc("get_all_pitches_with_subs");
        if (response.error) {
          console.error("Function error:", response.error);
          throw response.error;
        }
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getPitch5(_, date) {
      try {
        const response = await supabase.rpc("get_sub_pitch_bookings_by_date", {
          target_date: date,
        });
        if (response.error) {
          console.error("Function error:", response.error);
          throw response.error;
        }
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getPitch7(_, date) {
      try {
        const response = await supabase.rpc("get_pitch_bookings_by_date", {
          target_date: date,
        });
        if (response.error) {
          console.error("Function error:", response.error);
          throw response.error;
        }
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
   
  },
};
