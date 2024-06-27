export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteButton,
    handleLikeButton
  ) {
    this._data = data;
    this.isLiked = data.isLiked;
    this.id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
  }
  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                 EventListeners;                                ||
  // ! ||--------------------------------------------------------------------------------||

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeButton(this)
    );
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton(this)
    );
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name);
    });
  }

  // ! ||--------------------------------------------------------------------------------||
  // ! ||                                 EventHandlers;                                 ||
  // ! ||--------------------------------------------------------------------------------||

  _handleLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add(`card__like-button_active`);
    } else {
      this._likeButton.classList.remove(`card__like-button_active`);
    }
  }

  handleIsLiked(isLiked) {
    this.isLiked = isLiked;
    this._handleLikes();
  }

  deleteCard() {
    this._cardElement.remove();
    this._element = null;
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
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._setEventListeners();
    this._handleLikes();
    return this._cardElement;
  }
}
