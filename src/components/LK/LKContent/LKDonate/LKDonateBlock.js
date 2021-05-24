import React, { useEffect, useState } from "react";

import icon_qiwi from "../../../../assets/img/LK/lkCardQiwi.svg";
import icon_pay from "../../../../assets/img/LK/lkCardPay.svg";
import icon_phone from "../../../../assets/img/LK/lkCardPhone.svg";

import m_icon_qiwi from "../../../../assets/img/LK/lkCardQiwiM.svg";
import m_icon_pay from "../../../../assets/img/LK/lkCardPayM.png";
import m_icon_phone from "../../../../assets/img/LK/lkCardPhoneM.png";
import lkHelpSum from "../../../../assets/img/LK/lkHelpSum.svg";

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
  let mobile = false;
  if (window.innerWidth < 768) mobile = true;
  return (
    <div className="lk-content__block donate-block">
      {mobile ? (
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
        <p className="donate-block__balance">20₽</p>
        <p className="donate-block__sum">Сумма для перевода: 15₽</p>
      </div>
      {mobile ? <></> : <p>Транзакция</p>}

      <ul className="donate-block__select-card">
        <li
          className={`${card == "qiwi" ? "active" : ""}`}
          onClick={() => onClickCard("qiwi")}
          style={{
            backgroundImage: `url(${mobile ? m_icon_qiwi : icon_qiwi})`,
          }}
        ></li>
        <li
          className={`${card == "pay" ? "active" : ""}`}
          onClick={() => onClickCard("pay")}
          style={{ backgroundImage: `url(${mobile ? m_icon_pay : icon_pay})` }}
        ></li>
        <li
          className={`${card == "phone" ? "active" : ""}`}
          onClick={() => onClickCard("phone")}
          style={{
            backgroundImage: `url(${mobile ? m_icon_phone : icon_phone})`,
          }}
        ></li>
      </ul>
      <CardInputBlock />
      <SummInputBlock />

      <p className="donate-block__small-text">
        {mobile
          ? " Вывести деньги из кошелька можно только через 2 часа с момента зачисления на него"
          : "* Только что заработанные деньги можно вывести через 2 часа"}
      </p>
      <div className="btn donate-block__btn">перевести</div>
    </div>
  );
};

export default DonateBlock;
