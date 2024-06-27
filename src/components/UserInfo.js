export default class UserInfo {
  constructor({ titleSelector, descriptionSelector, profileImage }) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._imageElement = document.querySelector(profileImage);
  }

  getUserInfo() {
    return {
      name: this._titleElement.textContent,
      about: this._descriptionElement.textContent,
    };
  }

  setUserInfo(inputValues) {
    this._titleElement.textContent = inputValues.name;

    this._descriptionElement.textContent = inputValues.about;
  }
  setProfileImage(image) {
    this._imageElement.src = image.avatar;
  }
}
