import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import lkHelpSum from "../../../../assets/img/LK/lkHelpSum.svg";

import SelectCard from "../../../SelectCard/SelectCard";
import "./lkdonate.scss";

const CardInputBlock = ({ cardNum, setCardNum, type, val }) => {
  return (
    <div className="donate-block__input-card-block">
      <p>Номер телефона</p>{" "}
      {type == 5 ? (
        <Input
          addonBefore="+7"
          value={cardNum}
          type="tel"
          onChange={(e) => setCardNum(e.target.value)}
        />
      ) : (
        <Input
          addonBefore="+7"
          value={val.substr(1, val.length - 1)}
          type="tel"
          disabled
        />
      )}
    </div>
  );
};

const SummInputBlock = ({ sum, setSum, max }) => {
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    if (parseFloat(sum) > max || parseFloat(sum) < 200) {
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
  let active = false;
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  const balance = useSelector((state) => state.user.balance);
  const type_c = useSelector((state) => state.auth.withdrawal_type);
  const val_c = useSelector((state) => state.auth.withdrawal_value);

  useEffect(() => {
    if (max >= 200 && sum != "") {
      console.log(cardNum != "" && type_c == 5 && cardNum.length == 10, 211);
      if (
        (cardNum != "" && type_c == 5 && cardNum.length == 10) ||
        type_c != 5
      ) {
        active = true;
      }
    }
  });

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
      <CardInputBlock
        cardNum={cardNum}
        setCardNum={setCardNum}
        type={type_c}
        val={val_c}
      />
      <SummInputBlock sum={sum} setSum={setSum} max={max} />

      <p className="donate-block__small-text">
        Минимальная сумма для перевода 200 рублей
      </p>
      <div
        className={`btn donate-block__btn ${
          active ? "donate-block__btn_active" : ""
        }`}
        onClick={active ? () => fetchMoney(type_c) : () => {}}
      >
        перевести
      </div>
    </div>
  );
};

export default DonateBlock;
