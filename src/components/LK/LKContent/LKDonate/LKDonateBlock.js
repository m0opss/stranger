import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import lkHelpSum from "../../../../assets/img/LK/lkHelpSum.svg";

import SelectCard from "../../../SelectCard/SelectCard";
import "./lkdonate.scss";

const CardInputBlock = ({ cardNum, setCardNum }) => {
  return (
    <div className="donate-block__input-card-block">
      <p>Номер карты</p>
      <input
        value={cardNum}
        onChange={setCardNum}
        type="text"
        placeholder="**** **** **** 9999"
      />
    </div>
  );
};

const SummInputBlock = ({ sum, setSum, max }) => {
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    if (parseFloat(sum) > max) {
      setOverflow(true);
    } else {
      setOverflow(false);
    }
  }, [sum]);

  return (
    <div className="donate-block__input-summ-block">
      <p>Перевести</p>
      <div className="">
        <p>₽</p>
        <input
          className={`${overflow ? "overflow " : ""}`}
          type="number"
          min="0"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
        />
      </div>
    </div>
  );
};

const DonateBlock = ({ setCard, card, setSum, fetchMoney, sum, max }) => {
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
      <SummInputBlock sum={sum} setSum={setSum} max={max} />

      <p className="donate-block__small-text">
        {isMobile
          ? " Вывести деньги из кошелька можно только через 2 часа с момента зачисления на него"
          : "* Только что заработанные деньги можно вывести через 2 часа"}
      </p>
      <div className="btn donate-block__btn" onClick={fetchMoney}>
        перевести
      </div>
    </div>
  );
};

export default DonateBlock;
