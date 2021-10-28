"use strict";
//--------------------------------------------------------------------//

/**
 * Usine de création d'objets image et vidéo en lien avec la fonction mediaFactory() dans utils.js
 *
 */

//**IMAGE
export class Image {
  constructor(media) {
    this.photographer = media.photographerId;
    this.id = media.id;
    this.title = media.title;
    this.image = media.image;
    this.likes = media.likes;
    this.tags = media.tags;
    this.alt = media.alt;
  }

  //affiches le html de chaque media dans la gallerie du photographe
  mediaListShown() {
    return `
        <figure class="thumbnail" data-tag="${this.tags}">
            <a data-id="${this.id}" class="thumbnail_link" href="./src/imgs/media/${this.photographer}/${this.image}"><span class="hiddenText sr-only">${this.alt}</span></a>
            <img src="./src/imgs/media/${this.photographer}/${this.image}" alt="${this.alt}">
            <figcaption>
            <p class="caption"><span lang="en">${this.title}</span></p>
            <p class="likes-number">${this.likes}</p>
                <div class="like" tabindex="0">
                    <div class="likex" aria-label="likes"></div>
                </div>
            </figcaption>
        </figure>`;
  }

  //affiche le html de la lightbox correspondant au media
  lightboxShown() {
    return `
    <button class="lightbox_prev">photo précédente</button>
    <div class = "lightbox-media">
    <button class="lightbox_close">Fermer la fenêtre</button>
    <img src="./src/imgs/media/${this.photographer}/${this.image}" alt="${this.alt}"/>
    <p>${this.title}</p>
    </div>
    
    <button class="lightbox_next">Photo suivante</button>
    
           `;
  }
}

//!---------------------------------------**

//**VIDEO
export class Video {
  constructor(media) {
    this.photographer = media.photographerId;
    this.id = media.id;
    this.title = media.title;
    this.video = media.video;
    this.likes = media.likes;
  }

  mediaListShown() {
    return `
        <figure class="thumbnail" data-tag="${this.tags}">
        <a data-id="${this.id}" class="thumbnail_link" href="./src/imgs/media/${this.photographer}/${this.video}"><span class="hiddenText sr-only">${this.alt}</span></a>
        <video title="${this.alt}" src="./src/imgs/media/${this.photographer}/${this.video}"></video>
            <figcaption>
            <p class="caption"><span lang="en">${this.title}</span></p>
            <p class="likes-number">${this.likes}</p>
                <div class="like" tabindex="0">
                    <div class="likex" aria-label="likes"></div>
                </div>
            </figcaption>
        </figure>`;
  }

  lightboxShown() {
    return `
    <button class="lightbox_prev">Vidéo précédente</button>
    <div class = "lightbox-media">
    <button class="lightbox_close">Fermer la fenêtre</button>
    <video title="${this.alt}" controls="">
    <source src="./src/imgs/media/${this.photographer}/${this.video}" type="video/mp4"/>
    </video>
    <p>${this.title}</p>
    </div>
    
    <button class="lightbox_next">Vidéo suivante</button>
    
    `;
  }
}
