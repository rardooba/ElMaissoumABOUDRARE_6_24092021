"use strict";
//--------------------------------------------------------------------//

import { photographerDisplay } from "./index.js";

//!---------------------------------------**

//! Add Show All ? cf index.js

/**
 * Filtre par tags
 */
export const filterByTags = async () => {
  //tu attends l'affichage de la liste des photographes
  await photographerDisplay();

  //tu recup les elt avec la class .tag-name > tous les tags
  const tagElt = document.querySelectorAll(".tag-name");

  //pour chaque elt tu écoute l'event du click
  tagElt.forEach((tags) => {
    tags.addEventListener("click", (e) => {
      // event = e.target.dataset.tag; > correspond au data-tag

      //tu cibles les cartes des photographes
      const photographersCard = document.querySelectorAll(".card");

      //pour chaque carte tu crées un tableau contenant les tags
      /**
       * @returns {string} element.dataset.tag : le nom de elt dans data-tag="elt"
       */
      photographersCard.forEach((cardPhotographer) => {
        const photographerTags = Array.from(
          cardPhotographer.querySelectorAll(".tag-name")
        ).map((element) => element.dataset.tag);

        //tu crées un var qui contiendra les elt du tableau correspondant au data-tag
        const containSelectedTag = photographerTags.includes(
          e.target.dataset.tag
        );

        //tu recup le container de la liste des photographes
        const photographersList = document.querySelector(".photographes_list");

        //tu vérifies si le data-tag correspond au tag du photographe
        if (containSelectedTag) {
          cardPhotographer.style.display = "flex";
          //évite les trous dans le design
          photographersList.style.justifyContent = "unset";
        } else {
          cardPhotographer.style.display = "none";
        }
      });
    });
  });
};
