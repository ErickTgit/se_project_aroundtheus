export default class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._titleElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._titleElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}
