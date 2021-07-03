import React, { useEffect, useState } from "react";

import start from "../../assets/img/testStartBrand.svg";
import clock from "../../assets/img/testClock.svg";
import rub from "../../assets/img/testRub.svg";

import "./testslide.scss";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const TestSlide = ({
  img,
  name,
  time,
  price,
  id,
  progress,
  ind,
  startGame,
  ...props
}) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    setInterval(
      () =>
        setVal((val) => {
          if (val < progress) return val + 1;
          else return val;
        }),
      50
    );
  }, []);

  return (
    <div className="test-slide" onClick={() => console.log(id)}>
      <div className="test-slide__brand-logo">
        <img className="" src={`https://stranger-go.com${img}`} />
      </div>
      <div className="test-slide__name">{name}</div>
      <div className="test-slide__row">
        <div className="">
          <div className="test-slide__time">
            <img src={clock} />
            {time} мин
          </div>
          <div className="test-slide__price">
            <img src={rub} />
            {price}
          </div>
        </div>

        <a
          className="test-slide__play"
          id={ind == 1 ? "firstCard" : ""}
          onClick={() => startGame(id, progress)}
        >
          <img src={start} />
        </a>
      </div>
      <div className="test-slide__progress">
        <div
          className="test-slide__progress_field"
          style={
            val < 30
              ? {
                  backgroundColor: "#ef5c68",
                  width: `${val}%`,
                }
              : val >= 30 && val < 80
              ? { backgroundColor: "#ffc720", width: `${val}%` }
              : val == 100
              ? {
                  backgroundColor: "#17CA9B",
                  width: `${val}%`,
                  borderRadius: "0 0 20px 20px",
                }
              : { backgroundColor: "#17CA9B", width: `${val}%` }
          }
        ></div>
        <div
          className="test-slide__progress_space"
          style={
            val == 0
              ? { width: "100%", borderRadius: "0 0 20px 20px" }
              : { width: `${100 - val}%` }
          }
        ></div>
        <p>{val}%</p>
      </div>
    </div>
  );
};

export default TestSlide;
