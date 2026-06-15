import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import DashboardView from "../views/dashboard/DashboardView.vue";
import ResumeListView from "../views/resume/ResumeListView.vue";
import ResumeCreateView from "../views/resume/ResumeCreateView.vue";
import ResumeEditView from "../views/resume/ResumeEditView.vue";
import ProfileView from "../views/profile/ProfileView.vue";
import NotFound from "../views/notfound/NotFoundView.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/resumes",
    name: "Resumes",
    component: ResumeListView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/resumes/create",
    name: "CreateResume",
    component: ResumeCreateView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/resumes/:id/edit",
    name: "EditResume",
    component: ResumeEditView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/login");
  }

  if (
    authStore.isAuthenticated &&
    (to.path === "/login" || to.path === "/register")
  ) {
    return next("/dashboard");
  }

  next();
});

export default router;
