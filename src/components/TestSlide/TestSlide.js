import React from "react";

import start from "../../assets/img/testStartBrand.svg";
import clock from "../../assets/img/testClock.svg";
import rub from "../../assets/img/testRub.svg";

import "./testslide.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TestSlide = ({ img, name, time, price, id, ...props }) => {
  const token = useSelector((state) => state.auth.token);
  const startGame = () => {
    fetch("https://stranger-go.com/api/v1/games/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: id,
      }),
    });
  };

  return (
    <div className="test-slide" onClick={() => console.log(id)}>
      <div className="test-slide__brand-logo">
        <img className="" src={img} />
      </div>
      <div className="test-slide__name">{name}</div>
      <div className="test-slide__row">
        <div className="test-slide__time">
          <img src={clock} />
          {time} мин
        </div>
        <div className="test-slide__price">
          <img src={rub} />
          {price}
        </div>
        <Link
          className="test-slide__play"
          to={`/brand/${id}`}
          onClick={startGame}
        >
          <img src={start} />
        </Link>
      </div>
    </div>
  );
};

export default TestSlide;
