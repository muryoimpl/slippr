export function set (key, value) {
  return localStorage.setItem(key, value)
}

export function get (key, value) {
  return localStorage.getItem(key)
}
