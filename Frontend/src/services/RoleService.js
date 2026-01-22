export function storeRole(role) {
  localStorage.setItem("role", role);
  try {
    window.dispatchEvent(new Event("authChanged"));
  } catch (e) {}
}

export function getRole() {
  return localStorage.getItem("role");
}

export function removeRole() {
  localStorage.removeItem("role");

  try {
    window.dispatchEvent(new Event("authChanged"));
  } catch (e) {
    // ignore
  }
}
