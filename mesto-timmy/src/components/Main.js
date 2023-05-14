import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  //   function handleEditAvatarClick() {
  //     const popup = document.querySelector(".popup_type_avatar");
  //     popup.classList.add("popup_active");
  //   }

  //   function handleEditProfileClick() {
  //     const popup = document.querySelector(".popup_type_user");
  //     popup.classList.add("popup_active");
  //   }

  //   function handleAddPlaceClick() {
  //     const popup = document.querySelector(".popup_type_card");
  //     popup.classList.add("popup_active");
  //   }

  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        // console.log(res);
        // console.log(res.name);
        // console.log(res.about);
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  React.useEffect(() => {
    api
      .getCardsFromServer()
      .then((res) => {
        // console.log(res);
        setCards(res);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  return (
    <main className="content">
      <div className="profile">
        <button
          className="profile__avatar-button button"
          onClick={onEditAvatar}
        ></button>
        <img className="profile__avatar-img" src={userAvatar} alt="Аватар" />

        <div className="profile-info">
          <div className="profile-info__nowrap">
            <h1 className="profile-info__name">{userName}</h1>
            <button
              className="profile__edit-button button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile-info__text">{userDescription}</p>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </div>
      <section className="elements">
        {cards.map((card) => {
          return <Card card={card} onCardClick={onCardClick} />;
        })}
      </section>
    </main>
  );
}

export default Main;
