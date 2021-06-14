import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import lkHelpSum from "../../../../assets/img/LK/lkHelpSum.svg";

import SelectCard from "../../../SelectCard/SelectCard";
import "./lkdonate.scss";

const CardInputBlock = ({ cardNum, setCardNum, card }) => {
  return (
    <div className="donate-block__input-card-block">
      <p>Номер телефона</p>
      <Input
        addonBefore="+7"
        value={cardNum}
        type="tel"
        // placeholder={"+7**********"}
        onChange={(e) => setCardNum(e.target.value)}
      />
      {/* <input
        value={cardNum}
        onChange={(e) => setCardNum(e.target.value)}
        type="tel"
        placeholder={"+7**********"}
      /> */}
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

const DonateBlock = ({
  setCard,
  card,
  setSum,
  fetchMoney,
  sum,
  max,
  cardNum,
  setCardNum,
}) => {
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
        </div>
        <p className="donate-block__balance">{balance}₽</p>
        {/* <p className="donate-block__sum">Сумма для перевода: 15₽</p> */}
      </div>
      {isMobile ? <></> : <p>Транзакция</p>}
      <div className="donate-block__select-card">
        <SelectCard onClickCard={onClickCard} card={card} isMobile={isMobile} />
      </div>
      <CardInputBlock cardNum={cardNum} setCardNum={setCardNum} />
      <SummInputBlock sum={sum} setSum={setSum} max={max} />

      {/* <p className="donate-block__small-text">
        {isMobile
          ? " Вывести деньги из кошелька можно только через 2 часа с момента зачисления на него"
          : "* Только что заработанные деньги можно вывести через 2 часа"}
      </p> */}
      <div className="btn donate-block__btn" onClick={fetchMoney}>
        перевести
      </div>
    </div>
  );
};

export default DonateBlock;
