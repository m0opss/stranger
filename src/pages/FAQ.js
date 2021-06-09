import React, { useState } from "react";
import Slider from "react-slick";
import Container from "../components/Containers/Container";
import alien from "../assets/img/alien.svg";
import steps_1 from "../assets/img/alien.svg";
import steps_2 from "../assets/img/alien.svg";
import steps_3 from "../assets/img/alien.svg";
import steps_4 from "../assets/img/alien.svg";

import "./faq.scss";
import { Link } from "react-router-dom";

const StepsItem = ({ title, img, i }) => (
  <div className="wtf-block__steps-item step-card" onClick={() => {}}>
    <div className="step-card__img-container">
      <img src={img} />
    </div>
    <p>{title}</p>
  </div>
);

const FAQ = ({}) => {
  const [step, setStep] = useState(0);

  const settings = {
    dots: true,
    // focusOnSelect: true,
    infinite: false,
    slidesToShow: 1,
    speed: 500,
    afterChange: (current) => setStep(current),
  };
  return (
    <div className="page faq-page">
      <Container type="dark">
        <div className="faq-page__content">
          <Link to="/">
            <img src={alien} />
          </Link>
          <p className="faq-page__title">Выбери, что хочешь узнать</p>
          <p className="faq-page__descr">К какой категории относиться твой вопрос?</p>
        </div>
        <div className="wtf-block">
          <div className="wtf-block__steps">
            <StepsItem title="Выбери рекламу" img={steps_1} />
            <StepsItem title="Посмотри рекламу" img={steps_2} />
            <StepsItem title="Пройди тест" img={steps_3} />
            <StepsItem title="Получи деньги" img={steps_4} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQ;
