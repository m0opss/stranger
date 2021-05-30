import React from "react";
import { Link } from "react-router-dom";

import Container from "../components/Containers/Container";
import alien from "../assets/img/alien.png";
import steps_1 from "../assets/img/steps_1.png";
import steps_2 from "../assets/img/steps_2.png";
import steps_3 from "../assets/img/steps_3.png";
import steps_4 from "../assets/img/steps_4.png";

import "./main.scss";
import MainFooter from "../components/MainFooter/MainFooter";

const StepsItem = ({ title, img, i }) => (
  <div className="wtf-block__steps-item step-card">
    <p>{title}</p>
    <div className="step-card__img-container">
      <img src={img} />
    </div>
    <p className="step-card__cnt">{i}</p>
  </div>
);

const Main = () => {
  return (
    <div className="page">
      <Container type="dark">
        <div className="main-block">
          <p>
            MASTER THE GAME, <span>BECOME STRANGERS</span>
          </p>
          <div className="main-block__img-container">
            <img src={alien} />
          </div>
          <Link to="/test" className="btn main-block__btn">
            НАЧАТЬ
          </Link>
          <Link to="/rules" className="main-block__play-rules">
            Правила
          </Link>
        </div>
        <div className="wtf-block">
          <p className="wtf-block__title">ЧТО ЭТО ТАКОЕ?</p>
          <p className="wtf-block__descr">
            Революционный метод просмотра рекламы
          </p>
          <div className="wtf-block__steps">
            <StepsItem title="Выбери рекламу" img={steps_1} i={1} />
            <StepsItem title="Посмотри рекламу" img={steps_2} i={2} />
            <StepsItem title="Пройди тест" img={steps_3} i={3} />
            <StepsItem title="Получи деньги" img={steps_4} i={4} />
          </div>
        </div>
        <MainFooter />
      </Container>
    </div>
  );
};

export default Main;
