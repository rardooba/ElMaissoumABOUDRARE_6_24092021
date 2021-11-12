/* eslint-disable linebreak-style */
import { getProfileId } from "./utils.js";
//? Placer l'anime 'shake' sur les input type text ?
// Générer modale dynamiquement

//!---------------------------------------**

//Tu places les data du photographe dans un tableau (vide)
let photographerData = [];

//** DOM ELT */
//le container du site
const pageContainer = document.querySelector(".main-wrapper");
//le container du formulaire
const modal = document.querySelector(".modal");

//!---------------------------------------**

/**
 * f(x) création du html de la modale/formulaire
 */
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
              <div aria-labelledby="contactezmoi" class="modal-header">
                <h1 id="contactezmoi">Contactez-moi</h1>
                <button type="button" id="close-modal"
                title="Fermer cette fenêtre modale"
                data-dismiss="dialog">Fermer la fenêtre de contact</button>
              </div>
              <h2>${photographerData.name}</h2>
              <div class="form-data">
                <label for="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" aria-labelledby="firstname" />
                <small tabindex="0"></small>
              </div>
              <div class="form-data">
                <label for="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" aria-labelledby="lastname" />
                <small tabindex="0"></small>
              </div>
              <div class="form-data">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" aria-labelledby="email" />
                <small tabindex="0"></small>
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
                <small tabindex="0"></small>
              </div>
              <input type="submit" value="Envoyer" class="btn contact-btn submit"/>
              <button><span class="hiddenText">Envoyer</span></button>
          </form>
  `;
};

//!---------------------------------------**

//**  f(x) affichage de la modale
export const modalDisplay = async () => {
	//Tu attends que la modale soit crée
	await createModal();

	//Tu crées un tableau avec les elt focusable
	const focusableElementsArray = [
		"[href]",
		"button:not([disabled])",
		"input:not([disabled])",
		"textarea:not([disabled])",
		"[tabindex]:not([tabindex=\"-1\"])",
	];

	/**
   ** objet contenant les touches clavier
   */
	const keyCodes = {
		tab: "Tab",
		//enter
		enter: "Enter",
		//escape
		escape: "Escape",
	};

	//** DOM Elt */
	const modalBtn = document.querySelector(".contact-me");
	const closeBtn = document.getElementById("close-modal");

	//BG transparent de la modale
	const modalBg = document.querySelector(".modal-background");

	/**
   * f(x) > fermer la modale
   */
	const closeModal = () => {
		modal.style.display = "none";
		modalBg.style.display = "none";
		pageContainer.setAttribute("aria-hidden", "false");
		modal.setAttribute("aria-hidden", "true");

		// restoring focus on trigger btn
		//trigger.focus();
		modalBtn.focus();
	};

	/**
   * f(x) > ouvrir la modale
   */
	const openModal = () => {
		modalBtn.addEventListener("click", () => {
			modal.style.display = "block";
			modalBg.style.display = "block";
			pageContainer.setAttribute("aria-hidden", "true");
			modal.setAttribute("aria-hidden", "false");

			//Focusable elt
			const form = document.getElementById("contact");
			const focusableElements = form.querySelectorAll(focusableElementsArray);
			const firstFocusableElement = focusableElements[0];
			const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

			if (!firstFocusableElement) {
				return;
			}

			/**
       * TRAP FOCUS
       */
			window.setTimeout(() => {
				firstFocusableElement.focus();
				//** */ trapping focus inside the dialog
				focusableElements.forEach((focusableElement) => {
					if (focusableElement.addEventListener) {
						focusableElement.addEventListener("keyup", (e) => {
							const tab = e.key === keyCodes.tab;

							if (!tab) {
								return;
							}

							if (e.shiftKey) {
								if (e.target === firstFocusableElement) {
									// shift + tab
									e.preventDefault();

									lastFocusableElement.focus();
								}
							} else if (e.target === lastFocusableElement) {
								// tab
								e.preventDefault();

								firstFocusableElement.focus();
							}
						});
					}
				});
			}, 100);
		});
	};

	//Tu écoutes les events modalBtn et le closeBtn
	modalBtn.addEventListener("click", openModal);
	closeBtn.addEventListener("click", closeModal);

	//**Navigation au clavier
	window.addEventListener("keyup", (e) => {
		if (e.key === keyCodes.escape) {
			closeModal(modalBtn);
		} else if (e.key === keyCodes.enter) {
			openModal();
		}
	});
};

//!---------------------------------------**

//** Validation du formulaire
//! Tu attends que la modale soit affichée .then() = promesse
//modalDisplay().then(() => {
export const verifModal = () => {
	//** DOM Elt */
	const modalBg = document.querySelector(".modal-background");
	const form = document.getElementById("contact");
	const firstNameEl = document.getElementById("firstname");
	const lastNameEl = document.getElementById("lastname");
	const emailEl = document.getElementById("email");
	const messageEl = document.getElementById("yourmessage");

	const isrequired = (value) => value !== "";

	/**
   * f(x) afficher les erreurs dans le formulaire
   * @param {*} input > elt dans le DOM
   * @param {string} message d'erreur
   */
	const showError = (input, message) => {
		const parentEl = input.parentElement;
		input.classList.add("error");

		const error = parentEl.querySelector("small");
		error.textContent = message;
	};

	/**
   * f(x) afficher la validation du formulaire
   * @param {*} input
   */
	const showSuccess = (input) => {
		const parentEl = input.parentElement;
		input.classList.remove("error");
		const error = parentEl.querySelector("small");
		error.textContent = "";
	};

	//** Traitement du prénom */
	const checkFirstName = () => {
		let valid = false;
		const value = firstNameEl.value.trim();

		if (!isrequired(value)) {
			showError(firstNameEl, "Veuillez entrer un prénom");
		} else if (value.length < 2) {
			showError(firstNameEl, "Veillez entrer 2 caractères minimum");
		} else {
			valid = true;
			showSuccess(firstNameEl);
		}
		return valid;
	};

	//** Traitement du nom */
	const checkLastName = () => {
		let valid = false;
		const value = lastNameEl.value.trim();
		if (!isrequired(value)) {
			showError(lastNameEl, "Veuillez entrer un nom");
		} else if (value.length < 2) {
			showError(lastNameEl, "Veillez entrer 2 caractères minimum");
		} else {
			showSuccess(lastNameEl);
			valid = true;
		}
		return valid;
	};

	//! REGEX pour vérifier l'email
	const emailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

	/**
   * * Traitement de l'email
   * @returns {boolean}
   */
	const checkEmail = () => {
		let valid = false;
		const value = emailEl.value.trim();
		if (!isrequired(value)) {
			showError(emailEl, "Veuillez entrer un e-mail");
		} else if (!value.match(emailValid)) {
			showError(emailEl, "Veillez entrer un e-mail valide");
		} else {
			showSuccess(emailEl);
			valid = true;
		}
		return valid;
	};

	//** Traitement du message */
	const checkMessage = () => {
		let valid = false;
		const value = messageEl.value.trim();
		if (!isrequired(value)) {
			showError(messageEl, "Merci, de laisser un message");
		} else {
			showSuccess(messageEl);
			valid = true;
		}
		return valid;
	};

	//** Traitement du btn 'Envoyer' */
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		//Appel des f(x) de validation
		const firstNameValidation = checkFirstName();
		const lastNameValidation = checkLastName();
		const emailValidation = checkEmail();
		const messageValidation = checkMessage();

		//Tu places les vérifications des champs dans une var
		const formValidation =
      firstNameValidation &&
      lastNameValidation &&
      emailValidation &&
      messageValidation;

		//Fermeture de la modale après vqlidqtion
		if (formValidation) {
			//Tu affiches les valeurs des champs dans la console après l'envoie
			console.log(
				firstNameEl.value,
				lastNameEl.value,
				emailEl.value,
				messageEl.value
			);
			modal.style.display = "none";
			modalBg.style.display = "none";
			form.reset();
		}
	});

	//!---------------------------------------**

	//Validation du formulaire par cas
	form.addEventListener("input", (e) => {
		switch (e.target.id) {
		case "firstname":
			checkFirstName();
			break;
		case "lastname":
			checkLastName();
			break;
		case "email":
			checkEmail();
			break;
		case "yourmessage":
			checkMessage();
			break;
		default:
		}
	});
};
