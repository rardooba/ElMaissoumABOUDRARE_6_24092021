"use strict";
//--------------------------------------------------------------------//

const mainWrapper = document.querySelector(".main-wrapper");
const header = document.getElementsByTagName("header");
const main = document.getElementsByTagName("main");


//class recup dataApi
class ApiFishEye {
  /**
   * 
   * @returns {Object} Promise > Data
   * 
   */
  async getApiData() {
    let url = "./src/data/FishEyeDataFR.json";
    let res = await fetch(url);
    let data = await res.json();
    //je place les data dans deux tableaux pour pouvoir les cibler facilement
    const photographersDATA = [...data.photographers];
    const mediasDATA = [...data.media];
    return {
      "photographers": photographersDATA,
      "media": mediasDATA
    };
  }

  /**
   * @return PromiseResult > undefined
   */
  async displayApiData() {
    await this.getApiData();

    //display Homepage (But) return map() is not a fonction
    //pageVue.homePage();
  }
}

// const apiData = new ApiFishEye().getApiData();

// console.log(apiData);

const utils = {
  //usine pour injecter du html dans le DOM dans les elt header et main
  htmlEltFactory: function (homeHeaderHTML, homeMainHTML) {
    header.innerHTML = homeHeaderHTML;
    main.innerHTML = homeMainHTML;
  },
};

/**
 * Gestion de tous les composants de l'app dans une class
 */
class Components {
  constructor(logo, tags) {
    this.logo = this.logoDisplay();
    this.tags = this.tagsFilter();
  }

  logoDisplay() {
    const logo = document.createElement("a");
    logo.setAttribute("aria-label", "Page d'accueil fisheye");
    logo.setAttribute("href", "#");
    logo.setAttribute("class", "logo");
    logo.innerHTML = `
        Fish<i class="far fa-camera"></i>ye
        `;
    return header.appendChild(logo);
  }

  tagsFilter() {
    const tagsListNav = document.createElement("nav");
    tagsList.setAttribute("class", "cat-nav");
    tagsList.innerHTML = `
        <div class="tag-name tag-name--small">#Portrait</div>
        <div class="tag-name tag-name--small">#Art</div>
        <div class="tag-name tag-name--small">#Fashion</div>
        <div class="tag-name tag-name--small">#Architecture</div>
        <div class="tag-name tag-name--small">#Travel</div>
        <div class="tag-name tag-name--small">#Sport</div>
        <div class="tag-name tag-name--small">#Animals</div>
        <div class="tag-name tag-name--small">#Events</div>
        <div class="tag-name tag-name--small tag-name--active">Show All</div>
        `;
    return header.appendChild(tagsListNav);
  }
}

//Dynamic page vue > créer des pages dynamiquement via index.html
//Objet contenant des fonctions qui gèrent le html
class PageVue {
  homePage() {
    //map() > main > photographers
    //je demande un map() des cartes des photographes via la data api

    let photographersCardsGrid = new ApiFishEye();
    console.log("photographersCardsGrid", photographersCardsGrid);
    photographersCardsGrid
      .getApiData()
      .map(
        (photographer) =>
          `
          <div class="card">
            <a class="card_link" href="#"></a>
            <div class="avatar avatar--big"><img src="./src/imgs/photographe/Photographers ID Photos/${photographer.portrait}" alt="${photographer.alt}"></div>
            <div class="card_name">${photographer.name}</div>
            <div class="card_location">${photographer.city}, ${photographer.country}</div>
            <div class="card_citation">${photographer.tagline}</div>
            <div class="card_price">${photographer.price}/jour</div>
            <div class="tags--center">
                <div class="tag-name tag-name--small">#travel</div>
                <div class="tag-name tag-name--small">#events</div>
                <div class="tag-name tag-name--small">#travel</div>
                <div class="tag-name tag-name--small">#animals</div>
            </div>
          </div>
          `
      )
      .join("");

    let homeMainHTML = `
    <h1 class="photographes_title">Nos photographes</h1>
    <article class="photographes_list">
    ${photographersCardsGrid}
    </article>
    `;

    //Display Elt DOM
    const homeHeaderHTML = new Components(logo, tags);
    const addElthomePage = utils.htmlEltFactory(homeHeaderHTML, homeMainHTML);
    mainWrapper.appendChild(addElthomePage);

    return mainWrapper;
  }
};

//! Error map() is not a function
pageVue.homePage();