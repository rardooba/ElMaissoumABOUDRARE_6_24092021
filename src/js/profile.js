"use strict";
//--------------------------------------------------------------------//

import {
  getProfileId,
  getMediaFromProfile,
  mediaFactory,
  pageId,
} from "./utils.js";

import { goToContent } from "./modGoToContent.js";
import { handleFirstTab } from "./index.js";

//** DOM elt

//Main elt
const main = document.querySelector("main");
const header = document.querySelector("header");
//Gallery elt
const gallery = document.querySelector(".gallery");
//Custom select elt
const toggle = document.querySelector(".dropdown__toggle");
const menu = document.querySelector(".dropdown__menu");
const option = menu.querySelectorAll("li");
//lightBox elt
const lightbox = document.querySelector(".lightbox");
const lightboxContainer = document.createElement("div");

//!---------------------------------------**

//Tu place dans un tableau les data du photographe par son id
let photographerData = [];
let mediaData = [];

/**
 * * Tu affiches la bannière du profil
 */
const profileBannerDisplay = async () => {
  photographerData = await getProfileId();

  //traitement des tags Banner
  const tags = [];
  for (let i = 0; i < photographerData.tags.length; i += 1) {
    tags.push(
      `  
        <li><a href="#" class="tag-name tag-name--big" aria-label="${photographerData.tags[i]}" data-tag="${photographerData.tags[i]}">#${photographerData.tags[i]}</a></li>
      `
    );
  }

  //HTML banner injection DOM
  document.querySelector(".main-profile").innerHTML = `
  <div class="main-profile_description">
    <!-- Profile description -->
    <div class="profile">
        <div class="profile_name">${photographerData.name}</div>
        <div class="profile_location">${photographerData.city}, ${
    photographerData.country
  }</div>
        <div class="profile_citation">${photographerData.tagline}</div>
        <ul class="tags" lang="en">
        ${tags.join("")}
        </ul>
    </div>
    <!-- BTN Hire me -->
    <button class="btn hire-me contact-me btn--mobile" type="button" 
    aria-haspopup="dialog"
    aria-controls="dialog">Contactez-moi</button>
  </div>
  <!-- End profile description -->

  <!-- Avatar --big -->
  <div class="avatar avatar--small"><img src="./src/imgs/photographe/portraits/${
    photographerData.portrait
  }" alt=""></div>

  `;
};

//!---------------------------------------**

//** f(x) > Tags Media filter > Banner

export const tagFilterMedia = () => {
  const tags = document.querySelectorAll(".tag-name");
  tags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      const mediaEl = document.querySelectorAll(".thumbnail");
      mediaEl.forEach((element) => {
        const elt = element;
        const mediaTag = elt.dataset.tag;
        const containSelectedTag = mediaTag.includes(e.target.dataset.tag);
        const mediaGallery = document.querySelector(".gallery");
        if (containSelectedTag) {
          elt.style.display = "flex";
          mediaGallery.style.justifyContent = "space-evenly";
        } else {
          elt.style.display = "none";
        }
      });
    });
  });
};

//** Affichage de la bannière

profileBannerDisplay().then(() => {
  tagFilterMedia();
});

//!---------------------------------------**

/**
 * f(x) Affichage des media
 * @param {*} filter
 */
export const mediaDisplay = async (filter) => {
  //Tu attends la recup des media correspondant au profil
  mediaData = await getMediaFromProfile(pageId);

  //** Traitement du filtre dropdown menu */
  if (filter === "Popularité") {
    mediaData.sort((a, b) => (a.likes < b.likes ? 1 : -1));
  } else if (filter === "Date") {
    mediaData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } else if (filter === "Titre") {
    mediaData.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  // Show media by photographer ID
  gallery.innerHTML = "";
  mediaData.forEach((elt) => {
    const media = mediaFactory(elt);
    if (media !== undefined) {
      gallery.innerHTML += media.mediaListShown();
    }
  });
};

//!---------------------------------------**

/**
 * * Traitement des LIKES (compteur)
 */
const likesDisplay = async () => {
  //.like
  const likesContainer = document.querySelectorAll("figcaption");
  const values = Array.from(document.querySelectorAll(".likes-number")).map(
    (like) => parseInt(like.innerText, 10)
  );
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let totalOfLikes = values.reduce(reducer);
  photographerData = await getProfileId();

  // (html) Afficher dynamiquement le nombre total de likes et le prix du photographe
  document.querySelector(".like-counter").innerHTML = `
      <div class="like-counter--black">
        ${totalOfLikes}
        <i aria-label="j'aime" class="fas fa-heart"></i>
      </div>
      <p class="like-counter_price">${photographerData.price}€ / jour</p>

  `;

  /**
   * Compteur de like
   */
  likesContainer.forEach((element) => {
    const elt = element;
    const like = elt.querySelector(".likes-number");
    const totalContainer = document.querySelector(".like-counter--black");
    let likeValue = parseInt(like.innerText, 10);

    const manageTotalOfLikes = () => {
      if (like.hasAttribute("active")) {
        likeValue -= 1;
        totalOfLikes -= 1;
        like.removeAttribute("active");
      } else {
        likeValue += 1;
        totalOfLikes += 1;
        like.setAttribute("active", "");
      }
      like.innerHTML = likeValue;
      totalContainer.innerHTML = totalOfLikes;
    };

    //Possibilité de liker par appuie de la touche 'Entrée'
    const likesKeyup = (e) => {
      if (e.key === "Enter") {
        manageTotalOfLikes();
      }
    };

    //**Ecouteur */
    element.addEventListener("click", manageTotalOfLikes);
    element.addEventListener("keydown", likesKeyup);
  });

  //!---------------------------------------**

  /**
   * f(x) animation du coeur .svg
   */
  document.querySelectorAll(".likex").forEach((item) => {
    item.addEventListener("click", () => {
      let countLike = 0;
      if (countLike === 0) {
        item.classList.toggle("anim-like");
        countLike++;
        item.style.backgroundPosition = "right";
      } else {
        countLike = 0;
        item.style.backgroundPosition = "left";
      }
    });

    item.addEventListener("animationend", () => {
      item.classList.toggle("anim-like");
    });
  });
};

//!---------------------------------------**

//** f(x) Navigation dans la LightBox
export const lightboxNavigation = (medias, index, direction) => {
  let newIndex = index;
  if (direction === "next") {
    if (index === medias.length - 1) {
      newIndex = 0;
    } else {
      newIndex += 1;
    }
  } else if (direction === "prev") {
    if (index === 0) {
      newIndex = medias.length - 1;
    } else {
      newIndex -= 1;
    }
  }
  return medias[newIndex];
};

/**
 * f(x) Traitement de la LightBox
 */
export const manageLightbox = () => {
  //Tu recup les src img et vid
  const links = document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"');

  // Créer le container pour la lightbox
  lightboxContainer.classList.add("lightbox_container");
  lightbox.appendChild(lightboxContainer);

  /**
   * f(x) fermeture de la lightBox
   */
  const close = () => {
    header.classList.remove("hidden");
    main.classList.remove("hidden");
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
    document.removeEventListener("keyup", onKeyUp);
  };

  //fermeture de la lightBox au clavier
  const onKeyUp = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  //!---------------------------------------**

  // Générer un nouveau média dans la lightBox
  /**
   *
   * @param {*} media
   * @param {*} focusElt
   */
  const createMedia = (media, focusElt) => {
    //tu recup chaque media à partir de l'id du photographe et l'id du media
    const index = mediaData.findIndex((element) => element.id === media.id);

    //Navigation au clavier < > avec un écouteur sur la fenêtre du navigateur
    const keyEvent = (e) => {
      if (e.key === "ArrowRight") {
        const nextMedia = lightboxNavigation(mediaData, index, "next");
        createMedia(nextMedia, ".lightbox_next");
        window.removeEventListener("keyup", keyEvent);
      } else if (e.key === "ArrowLeft") {
        const prevMedia = lightboxNavigation(mediaData, index, "prev");
        createMedia(prevMedia, ".lightbox_prev");
        window.removeEventListener("keyup", keyEvent);
      }
      onKeyUp(e);
    };

    //tu vide (html) le conteneur de la lightBox
    lightboxContainer.innerHTML = "";

    //reconnaissance du type de media
    const mediaLightbox = mediaFactory(media);

    //si tu trouve un media ajoute le html correspondant à l'objet du media
    if (media !== undefined) {
      lightboxContainer.innerHTML += mediaLightbox.lightboxShown();
      if (focusElt !== undefined) {
        lightbox.querySelector(focusElt).focus();
      } else {
        lightbox.querySelector(".lightbox_close").focus();
      }
    }

    // Navigation dans la lightbox
    lightbox.querySelector(".lightbox_close").addEventListener("click", close);
    window.addEventListener("keyup", keyEvent);
    lightbox.querySelector(".lightbox_next").addEventListener("click", () => {
      const nextMedia = lightboxNavigation(mediaData, index, "next");
      createMedia(nextMedia, ".lightbox_next");
    });
    lightbox.querySelector(".lightbox_prev").addEventListener("click", () => {
      const prevMedia = lightboxNavigation(mediaData, index, "prev");
      createMedia(prevMedia, ".lightbox_prev");
    });
  };

  //Traitement des liens des media pour l'affichage dans la lightBox
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const mediaId = mediaData.find(
        (elt) => elt.id === parseInt(e.currentTarget.dataset.id, 10)
      );

      e.preventDefault();
      main.classList.add("hidden");
      header.classList.add("hidden");
      main.setAttribute("aria-hidden", "true");
      lightbox.classList.remove("hidden");
      lightbox.setAttribute("aria-hidden", "false");
      createMedia(mediaId);
    });
  });
};

/**
 ** f(x) Menu DropDown
 * effet du dropdown au click
 * @param {*} expand
 */
const toggler = (expand = null) => {
  const display =
    expand === null ? menu.getAttribute("aria-expanded") !== "true" : expand;

  menu.setAttribute("aria-expanded", display);

  if (display) {
    toggle.classList.add("active");
  } else {
    toggle.classList.remove("active");
  }
};

toggle.addEventListener("click", () => {
  toggler();
});

//dropdown au clavier
// const dropdomwKeyup = (e) => {
//   if (e.key === "Enter") {
//     toggler();
//   }
// };

const setValue = (element) => {
  const elt = element;
  const elementContent = element.textContent;
  const toggleContent = toggle.textContent;
  toggle.textContent = elementContent;
  elt.textContent = toggleContent;
  mediaDisplay(toggle.innerText).then(() => {
    // Afficher la lightbox au changement de filtre
    manageLightbox();
    // Afficher les likes au changement de filtre
    likesDisplay();
  });
  toggler(false);
};
option.forEach((item) => {
  item.addEventListener("click", () => setValue(item));
  const foo = (e) => {
    if (e.key === "Enter") {
      setValue(item);
    }
  };
  item.addEventListener("keydown", foo);
});

//PAGE LOAD DISPLAY
//** Affichage de la gallerie par default > "Popularité"
mediaDisplay("Popularité").then(() => {
  manageLightbox();
  likesDisplay();
  goToContent();
});

window.addEventListener('keydown', handleFirstTab);