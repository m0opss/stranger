import React, { useState } from "react";
import Slider from "react-slick";
import Container from "../components/Containers/Container";
import { Link } from "react-router-dom";

import alien from "../assets/img/alien.svg";
import steps_1 from "../assets/img/dataSec.svg";
import steps_2 from "../assets/img/reklama.svg";
import steps_3 from "../assets/img/qw.svg";
import steps_4 from "../assets/img/trMoney.svg";
import arw from "../assets/img/faqArw.svg";

import { Collapse } from "antd";
const { Panel } = Collapse;

import "./faq.scss";

const StepsItem = ({ title, img, setCard }) => (
  <div className="wtf-block__steps-item step-card" onClick={setCard}>
    <div className="step-card__img-container">
      <img src={img} />
    </div>
    <p>{title}</p>
  </div>
);

const cardsData = {
  1: {
    img: steps_1,
    title: "Защита данных",
    qw: {
      "ФОРМУЛИРОВКА САМОГО ВОПРОСА 1": [
        "ФОРМУЛИРОВКА  ПОДВОПРОСА 1",
        "ФОРМУЛИРОВКА САМОГО ПОДВОПРОСА 2",
      ],
      "ФОРМУЛИРОВКА САМОГО ВОПРОСА 2": [
        "ФОРМУЛИРОВКА  ПОДВОПРОСА 1",
        "ФОРМУЛИРОВКА САМОГО ПОДВОПРОСА 2",
      ],
    },
  },
  2: {
    img: steps_2,
    title: "Реклама",
    qw: {
      "ФОРМУЛИРОВКА САМОГО ВОПРОСА 1": [
        "ФОРМУЛИРОВКА  ПОДВОПРОСА 1",
        "ФОРМУЛИРОВКА САМОГО ПОДВОПРОСА 2",
      ],
      "ФОРМУЛИРОВКА САМОГО ВОПРОСА 2": [
        "ФОРМУЛИРОВКА  ПОДВОПРОСА 1",
        "ФОРМУЛИРОВКА САМОГО ПОДВОПРОСА 2",
      ],
    },
  },
  3: {
    img: steps_3,
    title: "Вопросы",
    qw: {
      "ФОРМУЛИРОВКА САМОГО ВОПРОСА 1": [
        "ФОРМУЛИРОВКА  ПОДВОПРОСА 1",
        "ФОРМУЛИРОВКА САМОГО ПОДВОПРОСА 2",
      ],
      "ФОРМУЛИРОВКА САМОГО ВОПРОСА 2": [
        "ФОРМУЛИРОВКА  ПОДВОПРОСА 1",
        "ФОРМУЛИРОВКА САМОГО ПОДВОПРОСА 2",
      ],
    },
  },
  4: {
    img: steps_4,
    title: "Перевести деньги",
    qw: {
      "ФОРМУЛИРОВКА САМОГО ВОПРОСА 1": [
        "ФОРМУЛИРОВКА  ПОДВОПРОСА 1",
        "ФОРМУЛИРОВКА САМОГО ПОДВОПРОСА 2",
      ],
      "ФОРМУЛИРОВКА САМОГО ВОПРОСА 2": [
        "ФОРМУЛИРОВКА  ПОДВОПРОСА 1",
        "ФОРМУЛИРОВКА САМОГО ПОДВОПРОСА 2",
      ],
    },
  },
};

const FAQ = ({}) => {
  const [card, setCard] = useState(0);

  return (
    <div className="page faq-page">
      <Container type="dark">
        <div className="faq-page__content">
          <Link to="/">
            <img src={alien} />
          </Link>
          <p className="faq-page__title">Выбери, что хочешь узнать</p>
          <p className="faq-page__descr">
            К какой категории относиться твой вопрос?
          </p>
        </div>

        {card != 0 ? (
          <div className="wtf-block">
            <div className="wtf-block__steps">
              <StepsItem
                title="Выбери рекламу"
                img={cardsData[card].img}
                setCard={() => setCard(0)}
              />

              <Collapse bordered={false} className="faq__collapse" accordion>
                {Object.keys(cardsData[card].qw).map((q) => (
                  <Panel
                    header={q}
                    key={q}
                    className="site-collapse-custom-panel"
                  >
                    {cardsData[card].qw[q].map((sub, i) => (
                      <p key={i}>{sub}</p>
                    ))}
                  </Panel>
                ))}
              </Collapse>
            </div>
          </div>
        ) : (
          <div className="wtf-block">
            <div className="wtf-block__steps">
              <>
                {Object.keys(cardsData).map((item) => (
                  <StepsItem
                    title={cardsData[item].title}
                    img={cardsData[item].img}
                    i={item}
                    setCard={() => setCard(item)}
                  />
                ))}
                {/* <StepsItem
                  title="Выбери рекламу"
                  img={steps_1}
                  setCard={() => setCard(1)}
                />
                <StepsItem
                  title="Посмотри рекламу"
                  img={steps_2}
                  i={2}
                  setCard={() => setCard(2)}
                />
                <StepsItem
                  title="Пройди тест"
                  img={steps_3}
                  i={3}
                  setCard={() => setCard(3)}
                />
                <StepsItem
                  title="Получи деньги"
                  img={steps_4}
                  i={4}
                  setCard={() => setCard(4)}
                /> */}
              </>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default FAQ;
