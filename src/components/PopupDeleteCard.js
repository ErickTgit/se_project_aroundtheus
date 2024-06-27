import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupDeleteButton =
      this._popupElement.querySelector(".modal__button");
    this._popupDeleteButtonText = this._popupDeleteButton.textContent;
  }

  handleDelete(handleDeleteSubmit) {
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._modalButton.textContent = loadingText;
    } else {
      this._popupDeleteButton.textContent = this._popupDeleteButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleteSubmit();
    });
  }
}
