export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                 EventListeners;                                ||
  // ! ||--------------------------------------------------------------------------------||

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                 EventHandlers;                                 ||
  // ! ||--------------------------------------------------------------------------------||

  _handleLikeButton() {
    this._likeButton.classList.toggle(`card__like-button_active`);
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                   ReturnCard;                                  ||
  // ! ||--------------------------------------------------------------------------------||
  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.Alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    // set event listeners
    this._setEventListeners();
    // return the card

    return this._cardElement;
  }
}
