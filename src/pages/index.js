import { config } from "../utils/constants.js";
import { initialCards } from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

// Elements
const profileEditButton = document.getElementById("profile-edit-button");
const profileEditModal = document.getElementById("profile-edit-modal");
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
const closeButtons = document.querySelectorAll(".modal__close");

const userInfo = new UserInfo(".profile__title", ".profile__description");

const popupWithImage = new PopupWithImage("#image-modal");

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({
      name: formData["profile-title-input"],
      job: formData["profile-description-input"],
    });
    profileEditPopup.close();
  }
);

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const newCard = {
    name: formData["input-type-title"],
    link: formData["input-type-url"],
  };
  cardSection.addItem(
    new Card(newCard, "#card-template", handleImageClick).getCardElement()
  );
  addCardValidator.toggleButtonState();
  addCardPopup.close();
});

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

const profileEditValidator = new FormValidator(config, profileEditForm);
const addCardValidator = new FormValidator(config, addCardFormElement);
profileEditValidator.enableValidation();
addCardValidator.enableValidation();

// Functions
function handleImageClick(link, name) {
  popupWithImage.open({ name, link });
}

function fillEditProfileForm() {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
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

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileEditValidator.hideInputError(profileEditForm);
  fillEditProfileForm();
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileEditPopup._handleFormSubmit(profileEditForm);
});

addCardFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  addCardPopup._handleFormSubmit(addCardFormElement);
});

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});
