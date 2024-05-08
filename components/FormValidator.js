class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._modalSpan = settings.modalSpan;
    this._form = formElement;
  }
  _resetSubmitButton() {
    _this._submitButton.classList.add(this._inactiveButtonClass);
  }
  hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(this._inputSelector);
    const modalSpan = this._form.querySelector(this._modalSpan);
    inputEl.classList.remove(this._inputErrorClass);
    modalSpan.classList.remove(this._errorClass);
    modalSpan.textContent = "";
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._inputErrorClass);
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
  }

  _toggleButtonState() {
    const isFormValidResult = this._isFormValid(this._inputEls);

    if (!isFormValidResult) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _isFormValid() {
    return this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this.hideInputError(inputEl);
    }
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(this._inputEls);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
