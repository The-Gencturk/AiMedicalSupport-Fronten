function initAdminMenu() {

    const menubar = document.getElementById("MenuButons");
    const menu = document.getElementById("Menu");
    const main = document.querySelector("main");

    if (!menubar || !menu) {
        console.log("Menü bulunamadı");
        return;
    }

    // Mobile default kapalı
    if (window.innerWidth < 768) {
        menu.classList.add("menu-closed");
    }

    // Toggle
    menubar.onclick = () => {

        menu.classList.toggle("menu-closed");

        if (main) {
            if (menu.classList.contains("menu-closed")) {
                main.style.marginLeft = "0";
            } else {
                main.style.marginLeft = "240px";
            }
        }
    };


    // Aktif sayfa
document.querySelectorAll("#Menu a").forEach(link => {

    if (link.href === window.location.href) {
      
        link.classList.add("bg-primary","text-white");
    }
});
}