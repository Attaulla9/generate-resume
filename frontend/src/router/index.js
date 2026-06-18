import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";

import DashboardLayout from "../layouts/DashboardLayout.vue";

import DashboardView from "../views/dashboard/DashboardView.vue";
import ResumeListView from "../views/resume/ResumeListView.vue";
import ResumeCreateView from "../views/resume/ResumeCreateView.vue";
import ResumeEditView from "../views/resume/ResumeEditView.vue";
import ProfileView from "../views/profile/ProfileView.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },

  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },

  {
    path: "/",
    name: "Dashboard Home",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },

    children: [
      {
        path: "",
        name: "DashboardRedirect",
        redirect: "/dashboard",
      },

      {
        path: "dashboard",
        name: "Dashboard",
        component: DashboardView,
      },

      {
        path: "resumes",
        name: "ResumeList",
        component: ResumeListView,
      },

      {
        path: "resumes/create",
        name: "ResumeCreate",
        component: ResumeCreateView,
      },

      {
        path: "resumes/:id/edit",
        name: "ResumeEdit",
        component: ResumeEditView,
      },

      {
        path: "profile",
        name: "Profile",
        component: ProfileView,
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "Login" };
  }

  if (
    authStore.isAuthenticated &&
    (to.path === "/login" || to.path === "/register")
  ) {
    return { name: "Dashboard" };
  }

  return true;
});

export default router;
