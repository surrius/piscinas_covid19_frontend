import Vue from "vue";
import { settings } from "@/commons/settings.js";

export async function getTotalOccupation(context, payload) {
  try {
    context.commit("loading/setLoadAnimation", true, { root: true });

    await Vue.axios({
      method: "GET",
      url:
        settings.baseURL_API +
        settings.nameAPI +
        settings.versionAPI +
        "capacity/",
      params: payload,
    }).then((response) => {
      if (response.data.status === "success") {
        context.commit("setSolarium", response.data.data.solarium);
        context.commit("setBigPool", response.data.data.bigPool);
        context.commit("setMediumPool", response.data.data.mediumPool);
        context.commit("setSmallPool", response.data.data.smallPool);
        let waterTemp = response.data.data.waterTemp.toFixed(2)
        context.commit("setWaterTemp", waterTemp);
      } else if (response.data.status === "warning") {
        context.commit("setSolarium", 0);
        context.commit("setBigPool", 0);
        context.commit("setMediumPool", 0);
        context.commit("setSmallPool", 0);
        context.commit("waterTemp", 0);
      } else {
        context.commit("setErrorMsg", response.data.message);
      }
      context.commit("setStatus", response.data.status);
    });
  } catch (e) {
    context.commit("setErrorMsg", e.message);
    context.commit("setStatus", "error");
  } finally {
    context.commit("loading/setLoadAnimation", false, { root: true });
  }
}
