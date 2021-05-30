import React from "react";

import start from "../../assets/img/testStartBrand.svg";
import clock from "../../assets/img/testClock.svg";
import rub from "../../assets/img/testRub.svg";

import "./testslide.scss";
import { Link } from "react-router-dom";

const TestSlide = ({ img, name, time, price, id, ...props }) => {
  return (
    <div className="test-slide">
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
        <Link className="test-slide__play" to={`/brand/${id}`}>
          <img src={start} />
        </Link>
      </div>
    </div>
  );
};

export default TestSlide;
