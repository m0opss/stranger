import React from "react";
import icon_visa from "../../../assets/img/LK/lkCardVisa.png";
import icon_qiwi from "../../../assets/img/LK/lkCardQiwi.svg";
import icon_pay from "../../../assets/img/LK/lkCardPay.svg";
import icon_phone from "../../../assets/img/LK/lkCardPhone.svg";
import lkHelpSum from "../../../assets/img/LK/lkHelpSum.svg";
import "./lkcontent.scss";

const DonateBlock = () => (
  <div className="lk-content__block donate-block">
    <div className="donate-block__main-banner">
      <div className="donate-block__balance-title">
        <p>Баланс</p>
        <img src={lkHelpSum} />
      </div>
      <p className="donate-block__balance">20₽</p>
      <p className="donate-block__sum">Сумма для перевода: 15₽</p>
    </div>
    <p>Транзакция</p>
    <ul className="donate-block__select-card">
      <li>
        <img src={icon_visa} />
      </li>
      <li>
        <img src={icon_qiwi} />
      </li>
      <li>
        <img src={icon_pay} />
      </li>
      <li>
        <img src={icon_phone} />
      </li>
    </ul>
    <div className="donate-block__input-card-block">
      <p>Номер карты</p>
      <input type="text" placeholder="**** **** **** 9999" />
    </div>
    <div className="donate-block__input-summ-block">
      <p>Перевести</p>
      <div className="">
        <p>₽</p>
        <input type="number" min="0" />
      </div>
    </div>
    <p className="donate-block__small-text">
      * Только что заработанные деньги можно вывести через 2 часа
    </p>
    <div className="btn donate-block__btn">перевести</div>
  </div>
);
const HistoryBlock = () => (
  <div className="lk-content__block">
    <div className="">history</div>
  </div>
);
const SettingsBlock = () => (
  <div className="lk-content__block">
    <div className="">set</div>
  </div>
);

const LKContent = ({ activeTab }) => {
  return (
    <div className="lk-content">
      {activeTab == "arr" ? (
        <DonateBlock />
      ) : activeTab == "history" ? (
        <HistoryBlock />
      ) : activeTab == "set" ? (
        <SettingsBlock />
      ) : (
        <></>
      )}
    </div>
  );
};

export default LKContent;
