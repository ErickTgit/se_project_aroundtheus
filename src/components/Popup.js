class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classlist.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      close();
    }
  }

  _closePopupOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal(e.currentTarget);
    }
  }

  setEventListeners() {}
}
