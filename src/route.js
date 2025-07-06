import { createRouter, createWebHistory } from "vue-router";
import home from "./pages/home.vue";
import booking from "./pages/booking.vue";
import admin_layout from "./layout/admin_layout.vue";
import pitch_management from "./components/admin/pitch_management.vue";
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
      path: "/admin",
      component: admin_layout,
      name: "admin",
      children: [
        {
          path: "pitch_management",
          component: pitch_management,
          name: "pitch_management",
        },
      ]
    },
    {
      path: "/booking",
      component: booking,
      name: "booking",
      beforeEnter: (to, from, next) => {
        if (!to.query.date || !to.query.pitch_type) {
          const today = new Date();
          const formattedDate = today.toISOString().split("T")[0];
          next({
            name: "booking",
            query: {
              date: formattedDate,
              pitch_type: "5",
            },
          });
        } else {
          next();
        }
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path && to.fullPath !== from.fullPath) {
      return false;
    }
    if (to.hash) {
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
