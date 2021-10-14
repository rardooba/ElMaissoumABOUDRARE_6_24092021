import { getPhotographerDATA } from "./utils.js";
import { filterByTags } from "./modFilterByTags.js";
import { goToContent } from "./modGoToContent.js";



let photographerData = [];

export const photographerDisplay = async () => {
  photographerData = await getPhotographerDATA();
  document.querySelector(".photographes_list").innerHTML = photographerData
    .map((photographer) => {
      const tags = [];
      for (let i = 0; i < photographer.tags.length; i += 1) {
        tags.push(
          `  
          <li><a href="#" class="tag-name tag-name--small" aria-label="${photographer.tags[i]}" data-tag ="${photographer.tags[i]}">#${photographer.tags[i]}</a></li>
          `
        );
      }
      return `
        <section class="card">
            <a class="card_link" href="photographe.html?id=${photographer.id}"></a>
            <div class="avatar avatar--big"><img src="./src/imgs/photographe/portraits/${
              photographer.portrait
            }" alt="${photographer.alt}"></div>
            <div class="card_name">${photographer.name}</div>
            <div class="card_location" lang="en">${photographer.city}, ${
        photographer.country
      }</div>
            <div class="card_citation">${photographer.tagline}</div>
            <div class="card_price">${photographer.price}€/jour</div>
            <ul class="tags--center">
            ${tags.join("")}
            </ul>
          </section>
          `;
    })
    .join("");
};

// Filtres
//! Show All ?
filterByTags();
// 'Voir le contenu'
goToContent();


