const API_BASE = "http://localhost:8000/api/v1";

async function getCurrentUser() {
    const res = await fetch(`${API_BASE}/auth/Me`, {
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





async function renderUserInfo() {
    const user = await getCurrentUser();
    const loginBt = document.getElementById("loginBt");
    const loginBtMobile = document.getElementById("loginBtMobile");

    if (!user) {
        if (loginBt) loginBt.classList.remove("hidden");
        if (loginBtMobile) loginBtMobile.classList.remove("hidden");
        return;
    }

    // İsim
    const nameElem = document.getElementById("username");
    if (nameElem) nameElem.textContent = user.full_name || "Kullanıcı";

    // Email
    const emailElem = document.getElementById("userEmail");
    if (emailElem) emailElem.textContent = user.email || "";

    // Profil resmi
    const img = document.getElementById("userProfile");
    const icon = document.getElementById("userProfileIcon");

    if (img) {
        if (user.profile) {
            img.src = "http://localhost:8000" + user.profile; // base URL ekledik
            img.classList.remove("hidden");
            if (icon) icon.classList.add("hidden");
        } else {
            img.classList.add("hidden");
            if (icon) icon.classList.remove("hidden");
        }
    }

    const menu = document.getElementById("profileMenu");
    if (img && menu) {
        let hideTimeout;
        img.addEventListener("mouseenter", () => { clearTimeout(hideTimeout); menu.classList.remove("hidden"); });
        menu.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
        img.addEventListener("mouseleave", () => { hideTimeout = setTimeout(() => menu.classList.add("hidden"), 150); });
        menu.addEventListener("mouseleave", () => { hideTimeout = setTimeout(() => menu.classList.add("hidden"), 150); });
    }

    // Admin kontrolü
    const roles = user.roles || [];
    if (roles.includes("SuperAdmin") || roles.includes("Admin")) {
        document.body.classList.add("AdminPower");
        const adminPanel = document.getElementById("adminPanel");
        const adminPower = document.getElementById("AdminPower");
        const adminPowerMobil = document.getElementById("AdminPowerMobil");
        if (adminPanel) adminPanel.classList.remove("hidden");
        if (adminPower) adminPower.classList.remove("hidden");
        if (adminPowerMobil) adminPowerMobil.classList.remove("hidden");
    }
}

// Sayfa yüklendiğinde çağır
document.addEventListener('DOMContentLoaded', renderUserInfo);