import React, { useState } from "react";
import Slider from "react-slick";
import Container from "../components/Containers/Container";
import { Link } from "react-router-dom";
import BackArr from "../components/BackArr/BackArr";

import alien from "../assets/img/alien.png";
import steps_1 from "../assets/img/dataSec.svg";
import steps_2 from "../assets/img/reklama.svg";
import steps_3 from "../assets/img/qw.svg";
import steps_4 from "../assets/img/trMoney.svg";
import arw from "../assets/img/faqArw.svg";

import { Collapse } from "antd";
const { Panel } = Collapse;

import "./faq.scss";
import { isMobile } from "react-device-detect";

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
      "МОЖНО ЛИ ИЗМЕНИТЬ ПОЧТУ?": [
        "Аккаунт привязан только к одной почте, поэтому если пользователь хочет поменять почту, он должен создать новый аккаунт. С новым мобильным телефоном и электронным кошельком.",
      ],
      "МОЖНО ЛИ ИЗМЕНИТЬ ПАРОЛЬ?": [
        "Пароль может быть изменен через Настройки в Личном Кабинете.",
      ],
    },
  },
  2: {
    img: steps_2,
    title: "Реклама",
    qw: {
      "Я ПРОШЕЛ ОДИН И ТОТ-ЖЕ ТЕСТ ДВА РАЗА, А ПОЛУЧИЛ ДЕНЬГИ ОДИН РАЗ?": [
        "По правилам нашего сайта вознаграждение платится только за прохождение одного теста. Смотрите другую рекламу на нашем сайте и зарабатывайте больше.",
      ],
      "ЧТО ДЕЛАТЬ ЕСЛИ НЕ НАЖИМАЕТСЯ КНОПКА CТАРТ ПЕРЕД ПРОСМОТРОМ РЕКЛАМЫ?": [
        "Скорее всего, бюджет от Рекламодателя закончился. Чтобы заработать больше, смотрите другую рекламу.",
      ],
    },
  },
  3: {
    img: steps_3,
    title: "Тест",
    qw: {
      "ЕСЛИ Я НЕ ПРАВИЛЬНО СДАЛ ТЕСТ, МОГУ ЛИ Я ЕЩЕ РАЗ ПРОЙТИ ЕГО?": [
        "Количество попыток сдать тест не ограничено.",
      ],
      "Я СДАЛ ТЕСТ. КАК МНЕ ПОЛУЧИТЬ ДЕНЬГИ?": [
        "После успешного прохождения теста, Вам будет предложено зарегистрироваться на сайте и получить вознаграждение в личном кабинете.",
      ],
    },
  },
  4: {
    img: steps_4,
    title: "Перевод денег",
    qw: {
      "ПОЧЕМУ Я НЕ МОГУ ВЫВЕСТИ ДЕНЬГИ ИЗ ЛИЧНОГО КАБИНЕТА?": [
        "Скорее всего, Вы не заработали минимальную сумму для вывода, которая составляет 200 рублей. Посмотрите ещё рекламу, заработайте больше, чем 200 рублей и забирайте деньги.",
      ],
      "НУЖНО ЛИ МНЕ ИМЕТЬ КРЕДИТНУЮ КАРТУ?": [
        "Достаточно иметь мобильный телефон или электронный кошелёк; Qiwi, Ю-money. Укажите их при регистрации.",
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
          <p className="faq-page__title">F.A.Q.</p>
          <p className="faq-page__descr">
            К какой категории относится твой вопрос?
          </p>
        </div>

        {card != 0 ? (
          <div className="wtf-block">
            <div
              className="wtf-block__steps"
              style={isMobile ? { flexWrap: "wrap" } : {}}
            >
              {isMobile ? (
                <></>
              ) : (
                <StepsItem
                  title={cardsData[card].title}
                  img={cardsData[card].img}
                  setCard={() => setCard(0)}
                />
              )}
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
              {isMobile ? (
                <BackArr
                  type="faq"
                  func={() => setCard(0)}
                  className="faq__back"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div className="wtf-block">
            <div className="wtf-block__steps">
              <>
                {Object.keys(cardsData).map((item, ind) => (
                  <StepsItem
                    key={ind}
                    title={cardsData[item].title}
                    img={cardsData[item].img}
                    i={item}
                    setCard={() => setCard(item)}
                  />
                ))}
              </>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default FAQ;
