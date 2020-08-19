import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/main",
  },
  {
    // Página principal.
    path: "/main",
    name: "main",
    component: () => import("../views/Main.vue"),
    redirect: "/aforo",
    children: [
      {
        // Proposito.
        path: "/informacion",
        name: "informacion",
        component: () => import("../views/Information.vue"),
      },
      {
        // Proposito.
        path: "/proposito",
        name: "proposito",
        component: () => import("../views/Proposito.vue"),
      },
      {
        // Pagina del Aforo.
        path: "/aforo",
        name: "aforo",
        component: () => import("../views/Aforo.vue"),
      },
    ],
  },
  {
    // Login de la aplicación
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    // Administrador.
    path: "/admin",
    name: "admin",
    meta: { requiresAuth: true },
    component: () => import("../views/Admin.vue"),
  },
];

const router = new VueRouter({
  routes,
});

document.title = "Piscinas Municipales Duruelo de la Sierra";

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isLogged = store.state.authentication.isLogged;
  // Si el usuario está loggeado y trata de acceder a la pagina de Login,
  // se le devuelve a la pestaña de Administracion
  if (!requiresAuth && isLogged && to.path === "/login") {
    return next("/admin");
  }

  // Si se trata de acceder a Administración sin estar logeado, se refirige al login
  if (requiresAuth && !isLogged) {
    next("/login");
  } else {
    next();
  }
});

export default router;
