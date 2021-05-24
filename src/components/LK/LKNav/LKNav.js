import React from "react";
import LKButton from "../Button/Button";
import sett from "../../../assets/img/LK/lkBtnSettings.svg";
import arr from "../../../assets/img/LK/lkBtnArrow.svg";
import rub from "../../../assets/img/LK/lkBtnRub.svg";

import plus from "../../../assets/img/LK/lkBtnRub.svg";
import box from "../../../assets/img/LK/lkBtnRub.svg";
import watch from "../../../assets/img/LK/lkBtnRub.svg";

import lkDown from "../../../assets/img/LK/lkDown.svg";
import lkHelpSum from "../../../assets/img/LK/lkHelpSum.svg";
import lkUp from "../../../assets/img/LK/lkUp.svg";
import { Progress } from "antd";

import "./lknav.scss";

const LKNavPanel = ({ buttons, activeTab, setActiveTab, isMobile }) => (
  <div className="lk-nav__block lknav__nav-panel">
    <p className="lknav__nav-panel-title">Операции</p>
    <div className="lknav__buttons-panel">
      {buttons.map((i) => (
        <LKButton
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          name={i.name}
          img={i.img}
          type={i.type}
          link={i.link}
        />
      ))}
      {/* <LKButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        name="Перевести"
        img={arr}
        type={isMobile ? `arr-m` : "arr"}
        link="/transfer"
      />

      <LKButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        name="История транзакций"
        img={rub}
        type={isMobile ? `history-m` : "history"}
        link="#history"
      />

      <LKButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        name="Настройки"
        img={sett}
        type="set"
      /> */}
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

const LKProgress = ({ isMobile }) => (
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
    <div className="progress-card__circle-info">
      <Progress
        type="circle"
        percent={75}
        width={isMobile ? 120 : 210}
        strokeWidth={`${isMobile ? "8" : "7"}`}
        trailColor="#E1E1E1"
        strokeColor={
          isMobile
            ? {
                "2.8%": "#05BA97",
                "97.2%": "#007B4C",
              }
            : {
                "0%": "#17CA9B",
                "100%": "#17CA9B",
              }
        }
      />
    </div>
  </div>
);

const LKNav = ({ activeTab, setActiveTab, isAdmin, isMobile }) => {
  const userPanel = [
    {
      name: "Перевести",
      img: arr,
      type: isMobile ? `arr-m` : "arr",
      link: "/transfer",
    },
    {
      name: "История транзакций",
      img: rub,
      type: isMobile ? `history-m` : "history",
      link: "#history",
    },
    { name: "Настройки", img: sett, type: "set", link: "" },
  ];
  const adminPanel_1 = [
    {
      name: "Добавить посты",
      img: plus,
      type: isMobile ? `arr-m` : "arr",
      link: "/transfer",
    },
    {
      name: "Архив",
      img: box,
      type: "arch",
      link: "",
    },
    { name: "Настройки", img: sett, type: "set", link: "" },
  ];
  const adminPanel_2 = [
    {
      name: "История транзакций",
      img: rub,
      type: isMobile ? `history-m` : "history",
      link: "#history",
    },
    {
      name: "Архив",
      img: watch,
      type: "",
      link: "",
    },
  ];
  return (
    <div className="lk-nav">
      {isAdmin ? (
        <>
          <LKNavPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={isMobile}
            buttons={adminPanel_1}
          />
          <LKNavPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={isMobile}
            buttons={adminPanel_2}
          />
        </>
      ) : (
        <>
          <BalanceBlock balance="20" />
          <LKNavPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={isMobile}
            buttons={userPanel}
          />
          <LKProgress isMobile={isMobile} />
        </>
      )}
    </div>
  );
};

export default LKNav;
