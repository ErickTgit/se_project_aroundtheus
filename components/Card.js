export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                 EventListeners;                                ||
  // ! ||--------------------------------------------------------------------------------||

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton;
      });
  }

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                 EventHandlers;                                 ||
  // ! ||--------------------------------------------------------------------------------||

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.add(`card__like-button_active`);
  }

  _handleDeleteButton() {
    this._cardElement.querySelector(".card__delete-button").remove();
    this._cardElement = null;
  }

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                   ReturnCard;                                  ||
  // ! ||--------------------------------------------------------------------------------||
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // set event listeners
    this._setEventListeners();
    // return the card
    console.log(this._cardElement);
    return this._cardElement;
  }
}
