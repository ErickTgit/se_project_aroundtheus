import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  modalSpan: ".modal__span",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Elements;                                    ||
// ! ||--------------------------------------------------------------------------------||

const profileEditButton = document.getElementById("profile-edit-button");
const profileEditModal = document.getElementById("profile-edit-modal");
const profileCloseModal = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.getElementById("profile-title-input");
const profileDescriptionInput = document.getElementById(
  "profile-description-input"
);
const profileEditForm = document.forms["profile-form"];
const addNewCardButton = document.getElementById("profile-add-button");
const addCardModal = document.getElementById("add-card-modal");
const cardTitleinput = document.getElementById("input-type-title");
const cardUrlInput = document.getElementById("input-type-url");
const addCardFormElement = document.forms["add-card-form"];
const cardWrap = document.querySelector(".cards__list");
const previewImageModal = document.getElementById("image-modal");
const previewTextEl = previewImageModal.querySelector(".modal__image-text");
const closeButtons = document.querySelectorAll(".modal__close");

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Functions;                                   ||
// ! ||--------------------------------------------------------------------------------||

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardWrap.prepend(card.getCardElement());
}
function handleImageClick(link, name) {
  previewImageModal.querySelector(".modal__preview-image").src = link;
  previewImageModal.querySelector(".modal__preview-image").alt = name + " ";
  previewTextEl.textContent = name;
  openModal(previewImageModal);
}

initialCards.forEach((cardData) => renderCard(cardData, cardWrap));
const profileEditValidator = new FormValidator(config, profileEditForm);
const addCardValidator = new FormValidator(config, addCardFormElement);
profileEditValidator.enableValidation();
addCardValidator.enableValidation();
// ! ||--------------------------------------------------------------------------------||
// ! ||                                 EventHandlers                                  ||
// ! ||--------------------------------------------------------------------------------||

function fillEditProfileForm(e) {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  closeModal(addCardModal);
  const name = cardTitleinput.value;
  const link = cardUrlInput.value;
  e.target.reset();
  renderCard({ name, link }), cardWrap;
  addCardValidator.toggleButtonState();
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalOutside);
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalOutside);
  document.removeEventListener("keydown", closeByEscape);
}

function closeModalOutside(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 EventListeners                                 ||
// ! ||--------------------------------------------------------------------------------||

profileEditButton.addEventListener("click", () => {
  profileEditValidator.hideInputError(profileEditForm);
  fillEditProfileForm();
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});
