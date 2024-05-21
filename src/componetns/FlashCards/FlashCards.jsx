import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import jesusImg from "../../assets/jesus.jpg";
import peleImg from "../../assets/pele.jpeg";
import magnoImg from "../../assets/magno.webp";
import hitlerImg from "../../assets/hitler.avif";
import pabloImg from "../../assets/pablo.png";
import curieImg from "../../assets/curie.jpg";

const characters = [
  { id: 1, name: "jesus", img: jesusImg },
  { id: 2, name: "Marie Curie", img: peleImg },
  { id: 3, name: "Isaac Newton", img: magnoImg },
  { id: 4, name: "Nikola Tesla", img: hitlerImg },
  { id: 5, name: "Leonardo da Vinci", img: pabloImg },
  { id: 6, name: "Galileo Galilei", img: curieImg },
];
export const FlashCards = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    const shuffledCards = shuffleArray([...characters, ...characters]);
    setCards(shuffledCards);
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const firstCard = cards[newFlippedCards[0]];
      const secondCard = cards[newFlippedCards[1]];

      if (firstCard.id === secondCard.id) {
        setMatchedPairs([...matchedPairs, firstCard.id]);
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  const renderCard = (card, index) => {
    const isFlipped =
      flippedCards.includes(index) || matchedPairs.includes(card.id);
    return (
      <div
        key={index}
        className={`card ${isFlipped ? "flipped" : ""}`}
        onClick={() => handleCardClick(index)}
      >
        <div className="card-front">
          <img src={card.img} alt={card.name} />
        </div>
        <div className="card-back"></div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Memorama de Personajes Históricos</h1>
      <div className="board">
        {cards.map((card, index) => renderCard(card, index))}
      </div>
    </div>
  );
};
