"use strict";
//--------------------------------------------------------------------//
// Btn > Allez vers le haut
export const goToContent = () => {
  //tu recup le btn
  const goContent = document.querySelector(".go-content");

  //tu écoutes l'event 'scroll'sur (Y) pour l'affichage du btn
  window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
      goContent.style.display = "inline";
    } else {
      goContent.style.display = "none";
    }
  });
};
