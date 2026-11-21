/* ================================== */
/* 1. NACTENI ULOZENEHO NASTAVENI      */
/* ================================== */

// Najdeme video a oba prepinace
const video = document.getElementById("background-video");
const tlacitkoVideo = document.getElementById("prepinac-videa");
const tlacitkoRezim = document.getElementById("prepinac-rezimu");


// Nacteme predchozi nastaveni z prohlizece
// Pokud uzivatel nic nenastavil, pouzijeme vychozi hodnoty

const videoZapnuto = localStorage.getItem("videoZapnuto") !== "false";
document.documentElement.classList.add("video-vypnuto");
const svetlyRezim = localStorage.getItem("svetlyRezim") === "true";
document.documentElement.classList.remove("video-vypnuto");


// Nastavime video podle ulozene hodnoty
if (!videoZapnuto) {

    video.style.display = "none";
    video.pause();

    tlacitkoVideo.classList.remove("zapnuto");
    tlacitkoVideo.setAttribute("aria-pressed", "false");

}


// Nastavime barevny rezim podle ulozene hodnoty
if (svetlyRezim) {

    document.body.classList.add("svetly-rezim");

    tlacitkoRezim.classList.add("zapnuto");
    tlacitkoRezim.setAttribute("aria-pressed", "true");

}



/* ================================== */
/* 2. PREPINANI VIDEA                  */
/* ================================== */

tlacitkoVideo.addEventListener("click", function () {

    // Zjistime aktualni stav
    const zapnuto = tlacitkoVideo.classList.contains("zapnuto");

    if (zapnuto) {

        // Vypneme video
        video.style.display = "none";
        video.pause();

        // Presuneme kolecko
        tlacitkoVideo.classList.remove("zapnuto");
        tlacitkoVideo.setAttribute("aria-pressed", "false");

        // Ulozime nastaveni
        localStorage.setItem("videoZapnuto", "false");

    } else {

        // Zapneme video
        video.style.display = "block";
        video.play();

        // Presuneme kolecko
        tlacitkoVideo.classList.add("zapnuto");
        tlacitkoVideo.setAttribute("aria-pressed", "true");

        // Ulozime nastaveni
        localStorage.setItem("videoZapnuto", "true");

    }

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