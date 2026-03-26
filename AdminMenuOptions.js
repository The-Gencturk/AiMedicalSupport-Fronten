function initAdminMenu() {

    const menubar = document.getElementById("MenuButons");
    const menu = document.getElementById("Menu");
    const main = document.querySelector("main");

    if (!menubar || !menu) {
        console.log("Menü bulunamadı");
        return;
    }

    // Mevcut duruma göre margin uygula
    function applyMargin() {
        if (!main) return;
        if (!menu.classList.contains("menu-closed") && window.innerWidth >= 768) {
            main.style.marginLeft = "240px";
            main.style.transition = "margin-left 0.3s ease";
        } else {
            main.style.marginLeft = "0";
            main.style.transition = "margin-left 0.3s ease";
        }
    }

    // Mobile default kapalı
    if (window.innerWidth < 768) {
        menu.classList.add("menu-closed");
    }

    // Sayfa açılışında hemen uygula
    applyMargin();

    // Toggle
    menubar.onclick = () => {
        menu.classList.toggle("menu-closed");
        applyMargin();
    };

    // Resize'da tekrar hesapla
    window.addEventListener("resize", applyMargin);

    // Aktif link
    document.querySelectorAll("#Menu a").forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
}