// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classlist.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classlist.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classlist.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classlist.remove(errorClass);
}

function checkInputValidtity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;
  inputEls.forEach((input) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    submitButton.classlist.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classlist.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const submitButton = formEl.querySelector(".modal__button");
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidtity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, options);
    // look for all inputs inside of form
    //Loop through all the inputs to see if all are valid
    //if input is not valid;
    //grab validation message
    //add error class to input
    //display error message
    //disable button
    //if all inputs valid;
    //enable button
    //reset error messages
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
