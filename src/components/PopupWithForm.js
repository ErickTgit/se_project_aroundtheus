import popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleformSubmit = handleFormSubmit;
  }

  close() {
    this.popupForm.reset();
    super.close();
  }
}
