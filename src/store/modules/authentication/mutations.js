export function setUser(state, user) {
  state.user = user;
  state.isLogged = true;
  state.error = false;
  state.errorMessage = "";
}

export function setAllowedProducts(state, allowedProducts) {
  state.allowedProducts = allowedProducts;
}

export function logout(state) {
  state.user = null;
  state.isLogged = false;
  state.allowedProducts = null;
}

export function authError(state, error) {
  state.user = null;
  state.isLogged = false;
  state.error = true;
  state.errorMessage = error;
  state.allowedProducts = null;
}