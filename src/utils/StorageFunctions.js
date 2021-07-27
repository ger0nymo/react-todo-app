export function setStorage(name, value) {
    localStorage.setItem(name, value);
}

export function getStorage(name) {
    return localStorage.getItem(name);
}
