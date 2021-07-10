import React from "react";
import { Link } from "react-router-dom";
import alien from "../assets/img/alien.png";
import steps_1 from "../assets/img/steps_1.png";
import steps_2 from "../assets/img/steps_2.png";
import steps_3 from "../assets/img/steps_3.png";
import steps_4 from "../assets/img/steps_4.png";
import Container from "../components/Containers/Container";

import "./about.scss";

const StepsItem = ({ title, img, i }) => (
  <div className="wtf-block__steps-item step-card">
    <p>{title}</p>
    <div className="step-card__img-container">
      <img src={img} />
    </div>
    <p className="step-card__cnt">{i}</p>
  </div>
);

const About = ({}) => {
  return (
    <div className="page about-page faq-page">
      <Container type="dark">
        <div className="faq-page__content">
          <Link to="/">
            <img src={alien} />
          </Link>
          <p className="faq-page__title">ЧТО ЭТО ТАКОЕ?</p>
          <p className="faq-page__descr">
            Революционный метод для просмотра рекламы
          </p>
        </div>
        <div className="wtf-block">
          <div className="wtf-block__steps">
            <StepsItem title="Выбери рекламу" img={steps_1} i="1" />
            <StepsItem title="Посмотри рекламу" img={steps_2} i="2" />
            <StepsItem title="Пройди тест" img={steps_3} i="3" />
            <StepsItem title="Получи деньги" img={steps_4} i="4" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
