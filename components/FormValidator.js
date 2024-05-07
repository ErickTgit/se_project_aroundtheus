class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = setings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }
  //
  _showInputError(inputEl, { inputErrorClass }) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
  }
  //
  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    const isFormValidResult = isFormValid(inputEls);

    if (!isFormValidResult) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    }
  }
  //
  _isFormValid(inputEls) {
    return inputEls.every((inputEl) => inputEl.validity.valid);
  }
  //
  _checkInputValidtity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, options);
    } else {
      hideInputError(formEl, inputEl, options);
    }
  }
  //
  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidtity(this._form, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }
  //
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  }
}

export default FormValidator;
