import React, { useEffect } from "react";

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
  isAuth,
  ind,
  handleClick,
  ...props
}) => {
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const startGame = () => {
    console.log(isAuth);
    if (isAuth) {
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
      }).then((res) => {
        if (res.ok) {
          history.push(`/brand/${id}`);
        } else {
          res.json().then((r) => handleClick(r[Object.keys(r)[0]], "error"));
        }
      });
    } else {
      history.push("/register");
    }
  };


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
        {progress == 100 ? (
          <div
            className="test-slide__play"
            style={{ opacity: ".5" }}
            id={ind == 1 ? "firstCard" : ""}
            onClick={()=> console.log(progress)}
          >
            <img src={start} />
          </div>
        ) : (
          <div
            className="test-slide__play"
            id={ind == 1 ? "firstCard" : ""}
            // to={"}
            onClick={startGame}
            style={{zIndex: '3'}}
          >
            <img src={start} onClick={startGame} />
          </div>
        )}
      </div>
      <div className="test-slide__progress">
        <div
          className="test-slide__progress_field"
          style={
            progress < 30
              ? {
                  backgroundColor: "#ef5c68",
                  width: `${progress}%`,
                }
              : progress >= 30 && progress < 80
              ? { backgroundColor: "#ffc720", width: `${progress}%` }
              : progress == 100
              ? {
                  backgroundColor: "#17CA9B",
                  width: `${progress}%`,
                  borderRadius: "0 0 20px 20px",
                }
              : { backgroundColor: "#17CA9B", width: `${progress}%` }
          }
        ></div>
        <div
          className="test-slide__progress_space"
          style={
            progress == 0
              ? { width: "100%", borderRadius: "0 0 20px 20px" }
              : { width: `${100 - progress}%` }
          }
        ></div>
        <p>{progress}%</p>
      </div>
    </div>
  );
};

export default TestSlide;
