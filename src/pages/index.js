import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
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

const profileEditButton = document.getElementById("profile-edit-button");
const addNewCardButton = document.getElementById("profile-add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.getElementById("profile-title-input");
const profileDescriptionInput = document.getElementById(
  "profile-description-input"
);
const profileEditForm = document.forms["profile-form"];
const addCardFormElement = document.forms["add-card-form"];
const cardTitleInput = document.getElementById("input-type-title");
const cardUrlInput = document.getElementById("input-type-url");
const cardWrap = document.querySelector(".cards__list");

const popupWithImage = new PopupWithImage("#image-modal");
popupWithImage.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    const title = formData[".profile-title-input"];
    const description = formData[".profile-description-input"];
    profileTitle.textContent = title;
    profileDescription.textContent = description;
    profileEditPopup.close();
  }
);
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const name = formData["input-type-title"];
  console.log({ name });
  const link = formData["input-type-url"];
  console.log(link);
  renderCard({ name, link });
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", handleImageClick);
      cardSection.addItem(card.getCardElement());
    },
  },
  ".cards__list"
);

cardSection.renderItems();

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardWrap.prepend(card.getCardElement());
}

function handleImageClick(link, name) {
  popupWithImage.open({ name, link });
}

// Form Validators
const profileEditValidator = new FormValidator(config, profileEditForm);
const addCardValidator = new FormValidator(config, addCardFormElement);
profileEditValidator.enableValidation();
addCardValidator.enableValidation();

// Event Handlers
function fillEditProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileEditValidator.hideInputError(profileEditForm);
  fillEditProfileForm();
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileEditPopup._handleFormSubmit(profileEditForm);
});

addCardFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  addCardPopup.close();
  e.target.reset();
  addCardValidator.toggleButtonState();
});
