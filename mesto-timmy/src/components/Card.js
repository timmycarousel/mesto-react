import React from "react";

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <div className="element">
      <img
        className="element__img"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__line-text">
        <h2 className="element__text">{card.name}</h2>
        <button className="element__trash button" type="button"></button>
        <div className="element__like-container">
          <button
            className="element__like-button button"
            type="button"
          ></button>
          <span className="element__counter-like">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
