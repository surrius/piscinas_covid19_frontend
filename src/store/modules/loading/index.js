import state from './state'
import * as mutations from './mutations'
import * as actions from './actions'
// namespaced se usa para obligar a identificar el módulo sobre el que trabajará un componente.
const namespaced = true

export default {
  namespaced,
  state,
  mutations,
  actions
}