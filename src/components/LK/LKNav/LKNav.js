import React from "react";
import LKButton from "../Button/Button";
import sett from "../../../assets/img/LK/lkBtnSettings.svg";
import arr from "../../../assets/img/LK/lkBtnArrow.svg";
import rub from "../../../assets/img/LK/lkBtnRub.svg";
import lkDown from "../../../assets/img/LK/lkDown.svg";
import lkHelpSum from "../../../assets/img/LK/lkHelpSum.svg";
import lkUp from "../../../assets/img/LK/lkUp.svg";

import "./lknav.scss";

const LKNavPanel = ({ activeTab, setActiveTab }) => (
  <div className="lk-nav__block lknav__nav-panel">
    <p className="lknav__nav-panel-title">Операции</p>
    <div className="lknav__buttons-panel">
      <LKButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        name="Перевести"
        img={arr}
        type="arr"
      />
      <LKButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        name="История транзакций"
        img={rub}
        type="history"
      />
      <LKButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        name="Настройки"
        img={sett}
        type="set"
      />
    </div>
  </div>
);

const BalanceBlock = ({ balance }) => (
  <div className="lk-nav__block balance-card">
    <p className="balance-card__title">Баланс</p>
    <p className="balance-card__balance">{balance}₽</p>
    <div className="balance-card__sum-block">
      <p>Сумма для перевода: 15₽</p>
      <img src={lkHelpSum} />
    </div>
    <div className="balance-card__arrow-block">
      <div className="balance-card__down-block">
        <img src={lkDown} />
        <p>-15₽</p>
      </div>
      <div className="balance-card__up-block">
        <img src={lkUp} />
        <p>+20₽</p>
      </div>
    </div>
  </div>
);

const LKProgress = ({}) => (
  <div className="lk-nav__block progress-card">
    <div className="progress-card__text-info">
      <p className="progress-card__title">Прогресс игры</p>
      <div className="progress-card__text-block">
        <p className="progress-card__text_accent">+10₽</p>
        <p className="progress-card__text">заработано</p>
      </div>
      <div className="progress-card__text-block">
        <p className="progress-card__text_accent">21/04/21</p>
        <p className="progress-card__text">последний раз</p>
      </div>
    </div>
    <div className="progress-card__circle-info"></div>
  </div>
);

const LKNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="lk-nav">
      <BalanceBlock balance="20" />
      <LKNavPanel activeTab={activeTab} setActiveTab={setActiveTab} />
      <LKProgress />
    </div>
  );
};

export default LKNav;
