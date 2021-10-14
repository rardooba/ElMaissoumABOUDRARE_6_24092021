export class Image {
  constructor(media) {
    this.id = media.id;
    this.title = media.title;
    this.image = media.image;
    this.likes = media.likes;
    this.tags = media.tags;
    this.alt = media.alt;
  }

  mediaListShown() {
    return `
        <figure class="thumbnail" data-tag="${this.tags}">
            <a data-id="${this.id}" class="thumbnail_link" href="./src/imgs/media/${this.image}"></a>
            <img src="./src/imgs/media/${this.image}" alt="${this.alt}">
            <figcaption>${this.title}
                <div class="like">
                    <p class="likes-number">${this.likes}</p>
                    <div tabindex="0" class="likex" aria-label="likes"></div>
                    </div>
            </figcaption>
        </figure>`;
  }

  lightboxShown() {
    return `
    <button class="lightbox_prev">Précédent</button>
    <div class = "lightbox-media">
    <button class="lightbox_close">Fermer</button>
    <img src="./src/imgs/media/${this.image}" alt="${this.alt}"/>
    <p>${this.title}</p>
    </div>
    
    <button class="lightbox_next">Suivant</button>
    
           `;
  }
}

export class Video {
  constructor(media) {
    this.id = media.id;
    this.title = media.title;
    this.video = media.video;
    this.likes = media.likes;
  }

  mediaListShown() {
    return `
        <figure class="thumbnail" data-tag="${this.tags}">
        <a data-id="${this.id}" class="thumbnail_link" href="./src/imgs/media/${this.video}"></a>
        <video title="${this.alt}" src="./src/imgs/media/${this.video}"></video>
            <figcaption>${this.title}
                <div class="like">
                    <p class="likes-number">${this.likes}</p>
                    <div tabindex="0" class="likex" aria-label="likes"></div>
                    </div>
            </figcaption>
        </figure>`;
  }

  lightboxShown() {
    return `
    <button class="lightbox_prev">Précédent</button>
    <div class = "lightbox-media">
    <button class="lightbox_close">Fermer</button>
    <video title="${this.alt}" controls="">
    <source src="./src/imgs/media/${this.video}" type="video/mp4"/>
    </video>
    <p>${this.title}</p>
    </div>
    
    <button class="lightbox_next">Suivant</button>
    
    `;
  }
}
