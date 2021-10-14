import {
  getProfileId,
  getMediaFromProfile,
  mediaFactory,
  pageId,
} from "./utils.js";

//DOM elt
//Gallery elt
const main = document.querySelector("main");
const gallery = document.querySelector(".gallery");
//Custom select elt
const toggle = document.querySelector(".dropdown__toggle");
const menu = document.querySelector(".dropdown__menu");
const option = menu.querySelectorAll("li");
//lightBox elt
const lightbox = document.querySelector(".lightbox");
const lightboxContainer = document.createElement("div");

//!---------------------------------------**

let photographerData = [];
let mediaData = [];

const profileBannerDisplay = async () => {
  photographerData = await getProfileId();

  //traitement des tags Banner
  const tags = [];
  for (let i = 0; i < photographerData.tags.length; i += 1) {
    tags.push(
      `  
        <li><a href="#" class="tag-name tag-name--big" aria-label="${photographerData.tags[i]}" data-tag="${photographerData.tags[i]}">#${photographerData.tags[i]}</a><span></span></li>
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
        <ul class="tags">
        ${tags.join("")}
        </ul>
    </div>
    <!-- BTN Hire me -->
    <button class="btn hire-me contact-me">Contactez-moi</button>
  </div>
  <!-- End profile description -->

  <!-- Avatar --big -->
  <div class="avatar avatar--big"><img src="./src/imgs/photographe/portraits/${
    photographerData.portrait
  }" alt=""></div>

  `;
};

// Tags Media filter > profile
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

profileBannerDisplay().then(() => {
  tagFilterMedia();
});

export const mediaDisplay = async (filter) => {
  mediaData = await getMediaFromProfile(pageId);

  // sort media by custom select
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

// Likes
const likesDisplay = async () => {
  const likesContainer = document.querySelectorAll(".like");
  const values = Array.from(document.querySelectorAll(".likes-number")).map(
    (like) => parseInt(like.innerText, 10)
  );
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let totalOfLikes = values.reduce(reducer);
  photographerData = await getProfileId();

  // Afficher dynamiquement le nombre total de likes et le prix/photographe
  document.querySelector(".like-counter").innerHTML = `
      <div class="like-counter--black">
        ${totalOfLikes}
        <i class="fas fa-heart"></i>
      </div>
      <p class="like-counter_price">${photographerData.price}€ / jour</p>

  `;

  //! Q : comment debbuger et pk l'anime se lit en boucle ? où placer la f(x)
  // const likex = document.querySelectorAll(".likex");
  // likex.forEach((elt) => {
  //   elt.addEventListener('click', () => {
  //     heartAnime();
  //   })
  // })
  

  likesContainer.forEach((element) => {
    element.addEventListener("click", () => {
      const elt = element;
      const like = elt.querySelector(".likes-number");
      const totalContainer = document.querySelector(".like-counter--black");
      let likeValue = parseInt(like.innerText, 10);

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
    });
    
  });

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
//heartAnime();
//! Comment placer la LBox dans un autre fichier
// Naviguer dans la lightbox
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

export const manageLightbox = () => {
  const links = document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"');

  // Créer le container de la lightbox
  lightboxContainer.classList.add("lightbox_container");
  lightbox.appendChild(lightboxContainer);

  //fermeture LightBox
  const close = () => {
    main.style.display = "flex";
    lightbox.classList.add("close");
   
    document.removeEventListener("keyup", onKeyUp);
  };
  const onKeyUp = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };

  const createMedia = (media) => {
    lightboxContainer.innerHTML = "";
    const mediaLightbox = mediaFactory(media);
    if (media !== undefined) {
      lightboxContainer.innerHTML += mediaLightbox.lightboxShown();
    }
    const i = mediaData.findIndex((element) => element.id === media.id);

    // Navigation dans la lightbox
    //! Blocage à l'utilisation du clavier < >
    lightbox.querySelector(".lightbox_close").addEventListener("click", close);
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight") {
        const nextMedia = lightboxNavigation(mediaData, i, "next");
        createMedia(nextMedia);
      } else if (e.key === "ArrowLeft") {
        const prevMedia = lightboxNavigation(mediaData, i, "prev");
        createMedia(prevMedia);
      }
      onKeyUp(e);
    });
    lightbox.querySelector(".lightbox_next").addEventListener("click", () => {
      const nextMedia = lightboxNavigation(mediaData, i, "next");
      createMedia(nextMedia);
    });
    lightbox.querySelector(".lightbox_prev").addEventListener("click", () => {
      const prevMedia = lightboxNavigation(mediaData, i, "prev");
      createMedia(prevMedia);
    });
  };

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const mediaId = mediaData.find(
        (elt) => elt.id === parseInt(e.currentTarget.dataset.id, 10)
      );

      e.preventDefault();
      main.style.display = "none";
      lightbox.classList.remove("close");
      createMedia(mediaId);
    });
  });
};

// Dropdown
const toggler = (expand = null) => {
  const display = expand === null ? menu.getAttribute('aria-expanded') !== 'true' : expand;

  menu.setAttribute('aria-expanded', display);

  if (display) {
    toggle.classList.add('active');
  } else {
    toggle.classList.remove('active');
  }
};

toggle.addEventListener('click', () => {
  toggler();
});

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
  item.addEventListener('click', () => setValue(item));
});

//PAGE LOAD

mediaDisplay("Popularité").then(() => {
  manageLightbox();
  likesDisplay();
});

