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
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });

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
    this._deleteButton.remove();
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
    console.log(this._deleteButton);
    // set event listeners
    this._setEventListeners();
    // return the card
    console.log(this._cardElement);
    return this._cardElement;
  }
}
