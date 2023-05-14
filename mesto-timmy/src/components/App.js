import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import Main from "./Main";
import { useState } from "react";

function App() {
  // function handleEditAvatarClick() {
  //   const popup = document.querySelector(".popup_type_avatar");
  //   popup.classList.add("popup_active");
  // }

  // function handleEditProfileClick() {
  //   const popup = document.querySelector(".popup_type_user");
  //   popup.classList.add("popup_active");
  // }

  // function handleAddPlaceClick() {
  //   const popup = document.querySelector(".popup_type_card");
  //   popup.classList.add("popup_active");
  // }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <body className="html">
      <div className="page">
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <PopupWithForm
          name="user"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            required
            type="text"
            name="name"
            id="nameValue"
            placeholder="Имя"
            className="popup__field-name field"
            maxlength="40"
            minlength="2"
          />
          <span
            id="nameValue-error"
            className="popup__span popup__span_error_visible"
          ></span>
          <input
            required
            type="text"
            name="info"
            id="infoValue"
            placeholder="О себе"
            className="popup__field-info field"
            maxlength="200"
            minlength="2"
          />
          <span
            id="infoValue-error"
            className="popup__span popup__span_error_visible"
          ></span>
        </PopupWithForm>
        <PopupWithForm
          name="card"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            required
            type="text"
            name="name"
            id="newValue"
            placeholder="Название"
            className="popup__field-name field"
            minlength="2"
            maxlength="30"
          />
          <span
            id="newValue-error"
            className="popup__span popup__span_error_visible"
          ></span>
          <input
            required
            type="url"
            name="link"
            id="UrlValue"
            placeholder="Ссылка на картинку"
            className="popup__field-info field"
          />
          <span
            id="UrlValue-error"
            className="popup__span popup__span_error_visible"
          ></span>
        </PopupWithForm>
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={false}
          onClose={closeAllPopups}
        ></PopupWithForm>
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="url"
            id="avatar"
            className="popup__field-avatar field"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
            minlength="2"
          />
          <span
            id="avatar-error"
            className="popup__span popup__span_error_visible"
          ></span>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </div>
    </body>
  );
}

export default App;
