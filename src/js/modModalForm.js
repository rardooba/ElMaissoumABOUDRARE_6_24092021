/* eslint-disable import/extensions */
import { getProfileId } from "./utils.js";
//! Placer l'anime sur les input type text 
// Générer modale dynamiquement

let photographerData = [];

const photographerPageContainer = document.querySelector('#photographer-main-content');
const modal = document.querySelector('.modal');

const createModal = async () => {
  photographerData = await getProfileId();
  modal.innerHTML = `
           <form
              id="contact"
              name="contact"
              action="photographe.html"
              method="GET"
              novalidate
            >
              <div class="modal-header">
                <h1>Contactez-moi</h1>
                <button type="button" id="close-modal">Close Contact</button>
              </div>
              <h2>${photographerData.name}</h2>
              <div class="form-data">
                <label for="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" aria-labelledby="firstname" />
                <small></small>
              </div>
              <div class="form-data">
                <label for="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" aria-labelledby="lastname" />
                <small></small>
              </div>
              <div class="form-data">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" aria-labelledby="email" />
                <small></small>
              </div>
              <div class="form-data">
                <label for="message">Votre message</label>
                <textarea
                name="yourmessage"
                id="yourmessage"
                aria-labelledby="yourmessage"
                cols="30"
                rows="5"
                ></textarea>
                <small></small>
              </div>
              <input type="submit" value="Envoyer" class="btn contact-btn submit" />
          </form>
  `;
};

// Ouvrir et fermer la modale

const modalDisplay = async () => {
  await createModal();
  const modalBtn = document.querySelector('.contact-me');
  const closeBtn = document.querySelector('#close-modal');
  const modalBg = document.querySelector('.modal-background');

  const closeModal = () => {
    modal.style.display = 'none';
    modalBg.style.display = 'none';
    photographerPageContainer.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'true');
  };

  modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    modalBg.style.display = 'block';
    photographerPageContainer.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  });
  closeBtn.addEventListener('click', closeModal);

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
};

// Validation formulaire
modalDisplay().then(() => {
  const modalBg = document.querySelector('.modal-background');
  const form = document.getElementById('contact');
  const firstNameEl = document.getElementById('firstname');
  const lastNameEl = document.getElementById('lastname');
  const emailEl = document.getElementById('email');
  const messageEl = document.getElementById('yourmessage');

  const isrequired = (value) => (value !== '');

  const showError = (input, message) => {
    const parentEl = input.parentElement;
    input.classList.add('error');

    const error = parentEl.querySelector('small');
    error.textContent = message;
  };

  const showSuccess = (input) => {
    const parentEl = input.parentElement;
    input.classList.remove('error');
    const error = parentEl.querySelector('small');
    error.textContent = '';
  };
  const checkFirstName = () => {
    let valid = false;
    const value = firstNameEl.value.trim();

    if (!isrequired(value)) {
      showError(firstNameEl, 'Veuillez entrer un prénom');
    } else if (value.length < 2) {
      showError(firstNameEl, 'Veillez entrer 2 caractères minimum');
    } else {
      valid = true;
      showSuccess(firstNameEl);
    }
    return valid;
  };
  const checkLastName = () => {
    let valid = false;
    const value = lastNameEl.value.trim();
    if (!isrequired(value)) {
      showError(lastNameEl, 'Veuillez entrer un nom');
    } else if (value.length < 2) {
      showError(lastNameEl, 'Veillez entrer 2 caractères minimum');
    } else {
      showSuccess(lastNameEl);
      valid = true;
    }
    return valid;
  };
  const emailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

  const checkEmail = () => {
    let valid = false;
    const value = emailEl.value.trim();
    if (!isrequired(value)) {
      showError(emailEl, 'Veuillez entrer un e-mail');
    } else if (!value.match(emailValid)) {
      showError(emailEl, 'Veillez entrer un e-mail valide');
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  };

  const checkMessage = () => {
    let valid = false;
    const value = messageEl.value.trim();
    if (!isrequired(value)) {
      showError(messageEl, 'Ce champ ne peut être vide');
    } else {
      showSuccess(messageEl);
      valid = true;
    }
    return valid;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstNameValidation = checkFirstName();
    const lastNameValidation = checkLastName();
    const emailValidation = checkEmail();
    const messageValidation = checkMessage();

    const formValidation = firstNameValidation
      && lastNameValidation
      && emailValidation
      && messageValidation;

    if (formValidation) {
      console.log(firstNameEl.value, lastNameEl.value, emailEl.value, messageEl.value);
      modal.style.display = 'none';
      modalBg.style.display = 'none';
      form.reset();
    }

  });

  form.addEventListener('input', (e) => {
    switch (e.target.id) {
      case 'firstname':
        checkFirstName();
        break;
      case 'lastname':
        checkLastName();
        break;
      case 'email':
        checkEmail();
        break;
      case 'yourmessage':
        checkMessage();
        break;
      default:
    }
  });
});