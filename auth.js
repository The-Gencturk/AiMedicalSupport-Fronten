const API_BASE = "http://localhost:8000/api/v1";

async function getCurrentUser() {
    const res = await fetch(`${API_BASE}/Role/profile`, {
        credentials: "include",
        method:"Get"
    });
    if (!res.ok) return null;
    return await res.json();
}

async function requireAuth(requiredRoles = []) {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = "login.html";
        return null;
    }
    if (requiredRoles.length > 0 && !requiredRoles.some(r => user.roles.includes(r))) {
        window.location.href = "404.html";
        return null;
    }
    return user;
}

async function apiFetch(url, options = {}) {
    options.credentials = "include";
    options.headers = { "Content-Type": "application/json", ...options.headers };
    const res = await fetch(url, options);
    if (res.status === 401) {
        window.location.href = "login.html";
        return null;
    }
    if (res.status === 403) {
        alert("Bu işlem için yetkiniz yok.");
        return null;
    }
    return await res.json();
}

async function logout() {
    await fetch(`${API_BASE}/auth/logout`, { method: "POST", credentials: "include" });
    window.location.href = "login.html";
}