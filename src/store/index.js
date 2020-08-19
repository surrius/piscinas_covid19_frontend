import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import loading from "./modules/loading";
import authentication from "./modules/authentication";
import occupation from "./modules/occupation";

export default new Vuex.Store({
  modules: {
    loading,
    authentication,
    occupation,
  },
});
