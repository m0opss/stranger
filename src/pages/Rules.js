import React from "react";
import { Link } from "react-router-dom";

import Container from "../components/Containers/Container";
import play from "../assets/img/rulesPlay.svg";
import all from "../assets/img/all.png";
import alien from "../assets/img/alienReg.svg";


import "./rules.scss";

const Rules = () => {
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  return (
    <div className="page rules">
      <Container type="dark">
        <div className="rules-bg__item_1"></div>
        <div className="rules-bg__item_2"></div>
        <div className="rules-bg__item_3"></div>
        <div className="main-block">
          <p>УЗНАЙ СЕКРЕТЫ STRANGERS</p>
          <div className="main-block__img-container">
            <p>
              <b>Рад приветствовать тебя в “Strangers”.</b> <br />
              <br />
              Начни зарабатовать на просмотре рекламы в виде игры.
            </p>
            <Link to="/rules-slides" className="main-block__img-play">
              <img src={play} />
            </Link>
          </div>
          <div className="main-block__alien">
            <img src={isMobile ? all : alien} className="" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Rules;
