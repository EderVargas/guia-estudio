var API_BASE = 'https://guia-estudio-api.onrender.com';
var AUTH_TOKEN_KEY = 'auth_token';

function getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

function setToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function clearToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
}

function isAuthenticated() {
    return !!getToken();
}

function authRedirect() {
    if (!isAuthenticated()) {
        var base = window.location.pathname.replace(/\/[^/]*$/, '/');
        window.location.replace(base + 'login.html');
    }
}

async function apiFetch(path, opts) {
    opts = opts || {};
    var token = getToken();
    var headers = Object.assign(
        { 'Content-Type': 'application/json' },
        token ? { 'Authorization': 'Bearer ' + token } : {},
        opts.headers || {}
    );
    var res = await fetch(API_BASE + path, Object.assign({}, opts, { headers: headers }));
    if (res.status === 401) {
        clearToken();
        authRedirect();
        return null;
    }
    return res;
}
