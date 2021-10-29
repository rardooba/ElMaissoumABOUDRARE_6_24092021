"use strict";
//--------------------------------------------------------------------//

import { Image, Video } from "./mediaFactory.js";

/**
 * * FETCH DATA .JSON
 *
 */
const url = "./src/data/FishEyeDataFR.json";
const myPromise = fetch(url).then((rawData) => rawData.json());

export const getDATA = async () => {
  //Fetch
  // const res = await fetch(url);
  //console.log(myPromise);
  // const res = await myPromise;
  // const data = await res.json();
  const data = await myPromise;

  //On place chaque data dans un tableau séparé
  const dataPhotographers = [...data.photographers];
  const dataMedias = [...data.media];

  //On retourne un objet (js) du FishEyeDataFR.json
  return {
    photographers: dataPhotographers,
    media: dataMedias,
  };
};

//!---------------------------------------**

/**
 * * SEARCH DATA By ID
 * On récupère l'id dans le Data.json puis on l'injecte dans l'url grâce à URLSearchParams()
 */
export const pageId = new URLSearchParams(window.location.search).get("id");

export const getProfileId = async () => {
  const photographer = (await getDATA()).photographers;
  return photographer.find((element) => element.id === parseInt(pageId, 10));
};

//!---------------------------------------**

/**
 * * Usine MEDIA
 * Tu vérifies le type de media (image ou vidéo) puis tu crées un object en fonction
 * @param {object} media de chaque photographes
 * @returns {object} images/videos > object undefined
 */
export const mediaFactory = (media) => {
  if (media.image) {
    return new Image(media);
  }
  if (media.video) {
    return new Video(media);
  }
  return undefined;
};

//!---------------------------------------**

/**
 **  Recupère les Media par l'ID du photographe
 * @param {string} #id du photographe
 * Tu convertis l'id
 */
export const getMediaFromProfile = async (id) => {
  const medias = (await getDATA()).media;
  return medias.filter(
    (element) => element.photographerId === parseInt(id, 10)
  );
};

export function handleFirstTab(e) {
  if (e.keyCode === 9) { // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
  }
}

//!---------------------------------------**

