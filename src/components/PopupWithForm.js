import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    console.log(this._popupForm);
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    console.log(this._inputList);
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    console.log(formValues);
    return formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      super.setEventListeners();
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
