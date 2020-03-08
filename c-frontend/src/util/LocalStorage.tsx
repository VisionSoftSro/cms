export function get<T>(key:string, initialValue:T = null) {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
}

export function set<T>(key:string, value:T) {
    window.localStorage.setItem(key, JSON.stringify(value));
}
