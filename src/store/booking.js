import supabase from "../composables/supabase";
export default {
  namespaced: true,
  state() {
    return {};
  },
  mutations: {},
  getters: {},
  actions: {
    async getPrice(_, { start_time, end_time, pitch_type }) {
      try {
        let { data, error } = await supabase.rpc("calculate_price", {
          input_end: end_time,
          input_pitch_type: pitch_type,
          input_start: start_time,
        });
        if (error) console.error(error);
        else return data;
      } catch (error) {
        console.log(error);
      }
    },
    async createBooking(
      _,
      { note, pitch_id, booking_date, start_time, end_time, total_price }
    ) {
      const { data, error } = await supabase.from("booking").insert([
        {
          note,
          pitch_id,
          booking_date,
          start_time,
          end_time,
          total_price,
        },
      ]);
      if (error) {
        console.error("Lỗi khi insert:", error);
      } else {
        console.log("Thêm thành công:", data);
      }
    },
  },
};
