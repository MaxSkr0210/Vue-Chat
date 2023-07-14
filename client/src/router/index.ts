import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AuthView from "@/views/AuthView.vue";
import FriendsView from "@/views/FriendsView.vue";
import store from "@/store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: {
      Auth: true,
    },
    component: HomeView,
  },
  {
    path: "/auth",
    name: "auth",
    meta: {
      Auth: false,
    },
    component: AuthView,
  },
  {
    path: "/friends",
    name: "friends",
    meta: {
      Auth: true,
    },
    component: FriendsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const loadRooms = async () => {
  await store.dispatch("fetchRooms");
};

router.beforeEach(async (to, from, next) => {
  await store.dispatch("getUser");
  const user = store.getters.getUser;

  if (to.meta.Auth) {
    if (typeof user !== "string") {
      await loadRooms();
      next();
    } else {
      next("/auth");
    }
  } else {
    if (typeof user === "string") {
      next();
    } else {
      next("/");
    }
  }
});

export default router;
