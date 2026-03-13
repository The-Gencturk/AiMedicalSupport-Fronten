document.addEventListener("DOMContentLoaded", () => {

    loadMenu("Footer", "Footer.html");
    loadMenu("Header", "Header.html", () => {
    initHeaderShrink();
    setActiveNav();
  });

  // MobileApp yüklenince animasyonu başlat

});


async function loadMenu(containerId, file, callback) {

  const container = document.getElementById(containerId);
  if (!container) return;

  try {

    const res = await fetch(file);
    const html = await res.text();

    container.innerHTML = html;

    if (callback) callback();

  } catch (err) {
    console.error(file + " yüklenemedi:", err);
  }

}



function setActiveNav() {

    let currentPage = window.location.pathname.split("/").pop();

    currentPage = decodeURIComponent(currentPage).toLowerCase();

    document.querySelectorAll("nav a.nav-link").forEach(link => {

        const linkPage = link
            .getAttribute("href")
            ?.split("/")
            .pop()
            ?.toLowerCase();

        link.classList.remove("active-link");

        if (linkPage === currentPage) {
            link.classList.add("active-link");
        }

    });
}

document.addEventListener("DOMContentLoaded", setActiveNav);


function initHeaderShrink() {

  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {

    const current = window.scrollY;

    // Sadece en üstteyken açık olsun
    if (current <= 10) {
      header.classList.remove("shrink");
    } else {
      header.classList.add("shrink");
    }

  });
}

const setupScrollUI = () => {
                const bar = document.querySelector("#scroll-progress > div");
                const topBtn = document.getElementById("backToTop");

                const onScroll = () => {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                    if (bar) bar.style.width = `${Math.min(100, Math.max(0, p))}%`;
                    if (topBtn) topBtn.classList.toggle("show", scrollTop > 600);
                };

                window.addEventListener("scroll", onScroll, { passive: true });
                onScroll();

                if (topBtn) {
                    topBtn.addEventListener("click", () => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    });
                }
            };


