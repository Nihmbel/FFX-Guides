function getBasePath() {
  // GitHub Pages unter /REPO/...
  const parts = window.location.pathname.split("/").filter(Boolean);
  return "/" + (parts.length ? parts[0] + "/" : "");
}

async function injectVersion() {
  try {
    const res = await fetch(getBasePath() + "assets/config.json");
    const cfg = await res.json();
    document.querySelectorAll("[data-version]").forEach(el => {
      el.textContent = `Stand: ${cfg.gameVersion} • Zuletzt aktualisiert: ${cfg.lastUpdated}`;
    });
  } catch (_) {}
}

function wireLangSwitch() {
  const aDe = document.querySelector("[data-lang='de']");
  const aEn = document.querySelector("[data-lang='en']");
  if (!aDe || !aEn) return;

  const path = window.location.pathname;

  // neutrale Startseite: Links fest setzen
  if (path.endsWith("/index.html") || path.endsWith("/FFX-Guides/") || path.endsWith("/FFX-Guides")) {
    aDe.href = getBasePath() + "de/";
    aEn.href = getBasePath() + "en/";
    return;
  }

  // Jobseiten / Sprachseiten: Pfad tauschen
  const deTarget = path.replace(/\/en\//, "/de/");
  const enTarget = path.replace(/\/de\//, "/en/");

  aDe.href = deTarget;
  aEn.href = enTarget;

  if (path.includes("/de/")) aDe.classList.add("active");
  if (path.includes("/en/")) aEn.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  injectVersion();
  wireLangSwitch();
});
