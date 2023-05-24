import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import Main from "./Main";
import { useState, useEffect } from "react";
import api from "../utils/Api";
// import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  useEffect(() => {
    api
      .getCardsFromServer()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="html">
        <div className="page">
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            cards={cards}
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
              maxLength="40"
              minLength="2"
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
              maxLength="200"
              minLength="2"
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
              minLength="2"
              maxLength="30"
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
              minLength="2"
            />
            <span
              id="avatar-error"
              className="popup__span popup__span_error_visible"
            ></span>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
