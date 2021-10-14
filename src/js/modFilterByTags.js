import { photographerDisplay } from "./index.js";

//! Add Show All ?

export const filterByTags = async () => {
  await photographerDisplay();

  const tagElt = document.querySelectorAll(".tag-name");

  tagElt.forEach((tags) => {
    tags.addEventListener("click", (e) => {
      e.target.dataset.tag;

      const photographersCard = document.querySelectorAll(".card");

      photographersCard.forEach((cardPhotographer) => {
        const photographerTags = Array.from(
          cardPhotographer.querySelectorAll(".tag-name")
        ).map((element) => element.dataset.tag);

        const containSelectedTag = photographerTags.includes(
          e.target.dataset.tag
        );

        const photographersList = document.querySelector(".photographes_list");

        if (containSelectedTag) {
          cardPhotographer.style.display = "flex";
          photographersList.style.justifyContent = "unset";
        } else {
          cardPhotographer.style.display = "none";
        }
      });
    });
  });
};


