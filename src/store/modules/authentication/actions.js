import Vue from "vue";
import { settings } from "@/commons/settings.js";

// // Para el entorno de desarrollo sin validar usuario y password
// export async function signIn(context, user) {
//   context.commit("setUser", user);
// }

export async function signIn(context, user) {
  try {
    context.commit("loading/setLoadAnimation", true, { root: true });

    await Vue.axios({
      method: "POST",
      url:
        settings.baseURL_API + settings.nameAPI + settings.versionAPI + "auth/",
      data: user,
    }).then((response) => {
      if (response.data.status === "success") {
        context.commit("setUser", user);
      } else {
        context.commit("authError", response.data.message);
      }
    });
  } catch (e) {
    context.commit("authError", e.message);
  } finally {
    context.commit("loading/setLoadAnimation", false, { root: true });
  }
}
