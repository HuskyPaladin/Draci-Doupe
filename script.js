/* ================================== */
/* 1. NACTENI ULOZENEHO NASTAVENI      */
/* ================================== */

// Najdeme video a oba prepinace
const video = document.getElementById("background-video");
const tlacitkoVideo = document.getElementById("prepinac-videa");
const tlacitkoRezim = document.getElementById("prepinac-rezimu");


// NACTENI ULOZENEHO NASTAVENI
const videoZapnuto = localStorage.getItem("videoZapnuto") !== "false";
const svetlyRezim = localStorage.getItem("svetlyRezim") === "true";

// SYNCHRONIZACE VZHLEDU WEBU
document.documentElement.classList.toggle("video-vypnuto", !videoZapnuto);
document.documentElement.classList.toggle("rezim-svetly", svetlyRezim);


/* NASTAVENI PREPINACU PRI NACTENI */

// VIDEO
tlacitkoVideo.classList.toggle("zapnuto", videoZapnuto);
tlacitkoVideo.setAttribute("aria-pressed", String(videoZapnuto));

video.style.display = videoZapnuto ? "block" : "none";

if (!videoZapnuto) {
    video.pause();
}

// BAREVNY REZIM
document.body.classList.toggle("svetly-rezim", svetlyRezim);

tlacitkoRezim.classList.toggle("zapnuto", svetlyRezim);
tlacitkoRezim.setAttribute("aria-pressed", String(svetlyRezim));

/* PREPINANI VIDEA */
tlacitkoVideo.addEventListener("click", function () {

    // Zjistime novy stav
    const zapnuto = !tlacitkoVideo.classList.contains("zapnuto");

    // Nastavime polohu kolecka
    tlacitkoVideo.classList.toggle("zapnuto", zapnuto);
    tlacitkoVideo.setAttribute("aria-pressed", String(zapnuto));

    // Aktualizujeme stav celeho webu
    document.documentElement.classList.toggle("video-vypnuto", !zapnuto);

    // Zapneme nebo vypneme video
    video.style.display = zapnuto ? "block" : "none";

    if (zapnuto) {
        video.play();
    } else {
        video.pause();
    }

    // Ulozime nastaveni
    localStorage.setItem("videoZapnuto", String(zapnuto));

});



/* ================================== */
/* 3. PREPINANI BAREVNEHO REZIMU       */
/* ================================== */

tlacitkoRezim.addEventListener("click", function () {

    // Zmenime barevny rezim
    document.body.classList.toggle("svetly-rezim");

    // Zjistime, jestli je svetly rezim aktivni
    const zapnuto = document.body.classList.contains("svetly-rezim");

    // Nastavime polohu kolecka
    tlacitkoRezim.classList.toggle("zapnuto", zapnuto);

    // Aktualizujeme stav tlacitka
    tlacitkoRezim.setAttribute("aria-pressed", String(zapnuto));

    // Ulozime nastaveni do prohlizece
    localStorage.setItem("svetlyRezim", String(zapnuto));
    // Synchronizujeme ulozeny rezim s HTML elementem
document.documentElement.classList.toggle("rezim-svetly", zapnuto);

});

/* ================================== */
/* ANIMACE AZ PO NACTENI NASTAVENI     */
/* ================================== */

// Nejprve se nacte ulozene nastaveni a nastavi poloha kolecek.
// Teprve potom povolime animaci pri kliknuti.

requestAnimationFrame(function () {

    requestAnimationFrame(function () {

        tlacitkoVideo.classList.add("animace-povolena");
        tlacitkoRezim.classList.add("animace-povolena");

    });

});


/* ================================== */
/* MOBILNI NAVIGACE                   */
/* ================================== */

// Najdeme tlacitko a navigaci
const mobilniTlacitko = document.querySelector(".mobilni-menu-tlacitko");
const mobilniNavigace = document.getElementById("hlavni-navigace");

// Otevreni a zavreni mobilniho menu
if (mobilniTlacitko && mobilniNavigace) {

    mobilniTlacitko.addEventListener("click", function () {

        // Prepneme viditelnost navigace
        const otevreno = mobilniNavigace.classList.toggle("otevrena");

        // Aktualizujeme pristupnost tlacitka
        mobilniTlacitko.setAttribute("aria-expanded", String(otevreno));

        // Zmenime ikonu podle stavu menu
        mobilniTlacitko.textContent = otevreno ? "✕" : "☰";

        // Aktualizujeme popisek
        mobilniTlacitko.setAttribute(
            "aria-label",
            otevreno ? "Zavřít navigaci" : "Otevřít navigaci"
        );

    });

}

/* ================================== */
/* MOBILNI VYBER LOKACE A FRAKCE      */
/* ================================== */

// Najdeme vsechna tlacitka pro mobilni vyber
const tlacitkaVyberu = document.querySelectorAll(".mobilni-vyber");

// Nastavime rozbalovani jednotlivych seznamu
tlacitkaVyberu.forEach(function (tlacitko) {

    // Najdeme seznam podle jeho ID
    const idSeznamu = tlacitko.getAttribute("aria-controls");
    const seznam = document.getElementById(idSeznamu);

    if (!seznam) return;

    // Otevreni a zavreni seznamu
    tlacitko.addEventListener("click", function () {

        const otevreno = seznam.classList.toggle("otevreny");

        // Aktualizujeme stav tlacitka
        tlacitko.setAttribute("aria-expanded", String(otevreno));

        // Zmenime sipku
        const sipka = tlacitko.querySelector("span");

        if (sipka) {
            sipka.textContent = otevreno ? "⌃" : "⌄";
        }

    });

});