import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./style.css";
import "./assets/styles/main.css";
import { useAuthStore } from "./stores/auth.store";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

const authStore = useAuthStore();

authStore.initializeAuth();

app.use(router);
app.use(Toast, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

app.mount("#app");
