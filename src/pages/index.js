import Api from "../components/Api.js";
import { config } from "../utils/constants.js";
import { initialCards } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

const profileImageEditButton = document.getElementById("avatar-button");
const profileEditButton = document.getElementById("profile-edit-button");
const addNewCardButton = document.getElementById("profile-add-button");
const profileEditImage = document.getElementById("profile-image-modal");
const profileTitleInput = document.getElementById("profile-title-input");
const profileDescriptionInput = document.getElementById(
  "profile-description-input"
);

const profileImageForm = document.forms["profile-image-form"];
const profileEditForm = document.forms["profile-form"];
const addCardFormElement = document.forms["add-card-form"];

const popupWithImage = new PopupWithImage("#image-modal");
popupWithImage.setEventListeners();

const deleteImageModal = new PopupDeleteCard("#delete-card-modal");
deleteImageModal.setEventListeners();

const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    handleEditProfileSubmit(formData);
  }
);
profileEditModal.setEventListeners();

//Declare API class:

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2db58c83-3523-4135-8564-2660432887a4",
    "Content-Type": "application/json",
  },
});

//Declare UserInfo Class:
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  profileImage: ".profile__image",
});

//Declare PopupWithForm for addCardModal:
const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  handleAddCardSubmit(formData);
  console.log(formData);
});
addCardPopup.setEventListeners();

//declare Edit Image Modal
const profileImageModal = new PopupWithForm(
  "#profile-image-modal",
  (formData) => {
    console.log(formData);
    handleChangeProfilePicture(formData.url);
  }
);
profileImageModal.setEventListeners();

//Declare Section for Initial Cards
let cardSection;

//RenderCardFunction
function renderCard(cardData) {
  const card = createCard(cardData);
  cardSection.addItem(card);
}
//Create Card Function
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteButton,
    handleLikeButton
  );
  return card.getCardElement();
}
//Click Card Function
function handleImageClick(link, name) {
  popupWithImage.open({ name, link });
}

function handleEditProfileSubmit(inputValues) {
  console.log(inputValues);
  profileEditModal.renderLoading("Saving...");
  api
    .updateUserInfo(inputValues)
    .then((res) => {
      userInfo.setUserInfo(res);
      profileEditValidator.resetValidation();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditModal.close();
      profileEditModal.renderLoading("Save");
    });
}

function handleAddCardSubmit(inputValues) {
  addCardPopup.renderLoading("Loading...");
  api
    .createCard(inputValues)
    .then((res) => {
      renderCard(res);
      addCardPopup.close();
      addCardValidator.resetValidation();
    })
    .finally(() => {
      addCardPopup.renderLoading("Save");
    });
}

function handleDeleteButton(card) {
  deleteImageModal.open();
  console.log(card.id);
  deleteImageModal.handleDelete(() => {
    deleteImageModal.renderLoading("Saving...");
    api
      .deleteCard(card.id)
      .then(() => {
        card.deleteCard();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deleteImageModal.close();
        deleteImageModal.renderLoading("Yes");
      });
  });
}

function handleLikeButton(card) {
  if (card.isLiked) {
    api
      .deleteLike(card.id)
      .then(() => {
        card.handleIsLiked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (!card.isLiked) {
    api
      .likeCard(card.id)
      .then(() => {
        card.handleIsLiked(true);
      })
      .catch((err) => {
        console.log(`Unable to process request, ${err}`);
      });
  }
}

function handleChangeProfilePicture(inputUrl) {
  profileImageModal.renderLoading("Loading...");
  api
    .updateProfileImage(inputUrl)
    .then((res) => {
      userInfo.setProfileImage(res);
      profileImageModal.close();
      profileImageForm.resetValidation();
      profileImageValidator.disableSubmit();
    })
    .catch((err) => {
      console.log(`Unable to process request, ${err}`);
    })
    .finally(() => {
      profileImageModal.renderLoading("Save");
    });
}

//ProfileEditButtonEventListeners
profileEditButton.addEventListener("click", () => {
  profileEditValidator.hideInputError(profileEditForm);
  const { name, about } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = about;
  profileEditModal.open();
  profileEditValidator.resetValidation();
});
//ProfileEditImageEventListeners
profileEditImage.addEventListener("click", () => {
  profileEditValidator.hideInputError(profileImageForm);
  const { url } = userInfo.getUserInfo();
});
//Add Card Button Event Listeners
addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardValidator.resetValidation();
});

profileImageEditButton.addEventListener("click", () => {
  profileImageModal.open();
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setProfileImage(userData);
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
  })
  .catch((err) => {
    console.log(`Unable to process request, ${err}`);
  });

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);

    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          renderCard(cardData);
        },
      },
      ".cards__list"
    );
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Unable to process request, ${err}`);
  });

// Form Validators
const profileImageValidator = new FormValidator(config, profileImageForm);
const profileEditValidator = new FormValidator(config, profileEditForm);
const addCardValidator = new FormValidator(config, addCardFormElement);

profileEditValidator.enableValidation();
addCardValidator.enableValidation();
profileImageValidator.enableValidation();
