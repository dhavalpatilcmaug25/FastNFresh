export function storeToken(tokenValue) {
  localStorage.setItem("token", tokenValue);
  // notify listeners that auth changed (login)
  try {
    window.dispatchEvent(new Event("authChanged"));
  } catch (e) {
    // ignore in non-browser environments
  }
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
  // notify listeners that auth changed (logout)
  try {
    window.dispatchEvent(new Event("authChanged"));
  } catch (e) {
    // ignore
  }
}
