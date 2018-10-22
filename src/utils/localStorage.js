export function set(key, value) {
  return localStorage.setItem(key, value);
}

export function get(key) {
  return localStorage.getItem(key);
}
