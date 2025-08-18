import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import NotFoundPage from "@/error/404.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // Usa el modo history para URLs limpias
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    // Otras rutas aquí...
    {
      path: "*", // Ruta comodín para manejar errores 404
      name: "NotFound",
      component: NotFoundPage,
    },
  ],
});