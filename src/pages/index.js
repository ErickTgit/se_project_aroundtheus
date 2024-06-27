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
const profileTitleInput = document.getElementById("profile-title-input");
const profileDescriptionInput = document.getElementById(
  "profile-description-input"
);

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
});
addCardPopup.setEventListeners();

//declare Edit Image Modal
const profileImageModal = new PopupWithForm(
  "#profile-image-modal",
  (formData) => {
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

function handleSubmit(
  request,
  popupInstance,
  reset,
  loadingText = "Saving..."
) {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();

      if (reset) {
        popupInstance.reset();
      }
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function handleEditProfileSubmit(inputValues) {
  function makeRequest() {
    return api.updateUserInfo(inputValues).then((userData) => {
      userInfo.setUserInfo(userData);
    });
  }
  handleSubmit(makeRequest, profileEditModal, true);
}

function handleAddCardSubmit(inputValues) {
  function makeRequest() {
    return api.createCard(inputValues).then((res) => {
      renderCard(res);
    });
  }
  handleSubmit(makeRequest, addCardPopup, true);
}

function handleDeleteButton(card) {
  deleteImageModal.open();
  return deleteImageModal.handleDelete(() => {
    function makeRequest() {
      return api.deleteCard(card.id).then(() => {
        card.deleteCard();
      });
    }
    handleSubmit(makeRequest, deleteImageModal, false, "Deleting...");
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
        console.log(`Unable to process request, ${err}`);
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
  function makeRequest() {
    return api.updateProfileImage(inputUrl).then((res) => {
      userInfo.setProfileImage(res);
    });
  }
  handleSubmit(makeRequest, profileImageModal, true);
}

//ProfileEditButtonEventListeners
profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = about;
  profileEditModal.open();
  formValidators["profile-form"].resetValidation();
});
//Add Card Button Event Listeners
addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
  formValidators["add-card-form"].resetValidation();
});

profileImageEditButton.addEventListener("click", () => {
  profileImageModal.open();
  formValidators["profile-image-form"].resetValidation();
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

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
