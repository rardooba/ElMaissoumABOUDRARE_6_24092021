import { Image, Video } from "./mediaFactory.js";


//** FETCH */
const url = "./src/data/FishEyeDataEN.json";

export const getPhotographerDATA = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data.photographers;
};

export const getMediaDATA = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data.media;
};

//** SEARCH DATA By ID */
export const pageId = new URLSearchParams(window.location.search).get("id");

export const getProfileId = async () => {
  const photographer = await getPhotographerDATA();
  return photographer.find((element) => element.id === parseInt(pageId, 10));
};

/**
 * Usine MEDIA
 * @param {object} media 
 * @returns 
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


//** Recup Media By ID */
export const getMediaFromProfile = async (id) => {
  const medias = await getMediaDATA();
  return medias.filter(
    (element) => element.photographerId === parseInt(id, 10)
  );
};
