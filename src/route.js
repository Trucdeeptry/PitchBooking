import { createRouter, createWebHistory } from "vue-router";
import home from "./pages/home.vue";
import booking from "./pages/booking.vue";
const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/", redirect: "home" },
    {
      path: "/home",
      component: home,
      name: "home",
    },
    {
      path: "/booking",
      component: booking,
      name: "booking",
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // Cuộn đến phần tử có ID tương ứng
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
// router.beforeEach(async (to, from, next) => {
//   const isAuth = await store.getters["auth/isAuthenticated"];
//   if (to.meta.requiresAuth && !isAuth) {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
