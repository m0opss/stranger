import React from "react";
import { Link } from "react-router-dom";

import Container from "../components/Containers/Container";
import play from "../assets/img/rulesPlay.svg";
import alien from "../assets/img/alienReg.svg";

import "./rules.scss";

const Rules = () => {
  return (
    <div className="page rules">
      <Container type="dark">
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
          <img src={alien} className="" />
        </div>
        </div>
      </Container>
    </div>
  );
};

export default Rules;
