import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main className="content">
      <div className="profile">
        <button
          className="profile__avatar-button button"
          onClick={props.onEditAvatar}
        ></button>
        <img className="profile__avatar-img" src={avatar} alt={name} />

        <div className="profile-info">
          <div className="profile-info__nowrap">
            <h1 className="profile-info__name">{name}</h1>
            <button
              className="profile__edit-button button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile-info__text">{about}</p>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </div>
      <section className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              card={card}
              link={card.link}
              name={card.name}
              onCardDelete={props.onCardDelete}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              key={card._id}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
