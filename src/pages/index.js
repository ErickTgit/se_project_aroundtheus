import { config } from "../utils/constants.js";
import { initialCards } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

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
const cardWrap = document.querySelector(".cards__list");

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const popupWithImage = new PopupWithImage("#image-modal");
popupWithImage.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    const { name, description } = formData;
    userInfo.setUserInfo({ name, description });
    profileEditPopup.close();
  }
);

profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const name = formData.title;
  const link = formData.url;
  renderCard({ name, link });
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      renderCard(cardData);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

function renderCard(cardData) {
  const card = createCard(cardData);
  cardSection.addItem(card);
}
//Added Create Card Function
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardElement();
}

function handleImageClick(link, name) {
  popupWithImage.open({ name, link });
}

// Form Validators
const profileEditValidator = new FormValidator(config, profileEditForm);
const addCardValidator = new FormValidator(config, addCardFormElement);
profileEditValidator.enableValidation();
addCardValidator.enableValidation();

// Event Listeners

profileEditButton.addEventListener("click", () => {
  profileEditValidator.hideInputError(profileEditForm);
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
