import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import lkHelpSum from "../../../../assets/img/LK/lkHelpSum.svg";

import SelectCard from "../../../SelectCard/SelectCard";
import "./lkdonate.scss";

const CardInputBlock = ({}) => {
  return (
    <div className="donate-block__input-card-block">
      <p>Номер карты</p>
      <input type="text" placeholder="**** **** **** 9999" />
    </div>
  );
};

const SummInputBlock = ({}) => {
  const max = 20;
  const [overflow, setOverflow] = useState(false);

  const [value, setValue] = useState(0);
  useEffect(() => {
    if (parseFloat(value) > max) {
      setOverflow(true);
    } else {
      setOverflow(false);
    }
  }, [value]);

  return (
    <div className="donate-block__input-summ-block">
      <p>Перевести</p>
      <div className="">
        <p>₽</p>
        <input
          className={`${overflow ? "overflow " : ""}`}
          type="number"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

const DonateBlock = ({ setCard, card }) => {
  const onClickCard = (kind) => {
    setCard(kind);
  };
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  const balance = useSelector((state) => state.user.balance);

  return (
    <div className="lk-content__block donate-block">
      {isMobile ? (
        <p className="donate-block__title_m">Перевести деньги</p>
      ) : (
        <></>
      )}
      <div className="donate-block__main-banner">
        <div className="donate-block__main-banner_bg-el_1"></div>
        <div className="donate-block__main-banner_bg-el_2"></div>
        <div className="donate-block__main-banner_bg-el_3"></div>
        <div className="donate-block__main-banner_bg-el_4"></div>
        <div className="donate-block__main-banner_bg-el_5"></div>
        <div className="donate-block__balance-title">
          <p>Баланс</p>
          {/* <img src={lkHelpSum} /> */}
        </div>
        <p className="donate-block__balance">{balance}₽</p>
        <p className="donate-block__sum">Сумма для перевода: 15₽</p>
      </div>
      {isMobile ? <></> : <p>Транзакция</p>}
      <div className="donate-block__select-card">
        <SelectCard onClickCard={onClickCard} card={card} isMobile={isMobile} />
      </div>
      <CardInputBlock />
      <SummInputBlock />

      <p className="donate-block__small-text">
        {isMobile
          ? " Вывести деньги из кошелька можно только через 2 часа с момента зачисления на него"
          : "* Только что заработанные деньги можно вывести через 2 часа"}
      </p>
      <div className="btn donate-block__btn">перевести</div>
    </div>
  );
};

export default DonateBlock;
