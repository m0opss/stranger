import React from "react";
import LKButton from "../Button/Button";
import sett from "../../../assets/img/LK/lkBtnSettings.svg";
import arr from "../../../assets/img/LK/lkBtnArrow.svg";
import rub from "../../../assets/img/LK/lkBtnRub.svg";

import plus from "../../../assets/img/LK/lkBtnPlus.svg";
import box from "../../../assets/img/LK/lkBtnBox.svg";
import watch from "../../../assets/img/LK/lkBtnWatch.svg";
import icon_log from "../../../assets/img/LK/inputIconLog.svg";

import lkDown from "../../../assets/img/LK/lkDown.svg";
import lkHelpSum from "../../../assets/img/LK/lkHelpSum.svg";
import lkUp from "../../../assets/img/LK/lkUp.svg";
import { Progress } from "antd";

import "./lknav.scss";
import { useSelector } from "react-redux";

const LKNavPanel = ({ buttons, activeTab, setActiveTab, isAdmin, title }) => (
  <div
    className={`lk-nav__block lknav__nav-panel ${isAdmin ? "admin-panel" : ""}`}
  >
    <p className="lknav__nav-panel-title">{title}</p>
    <div className="lknav__buttons-panel">
      {buttons.map((i) => (
        <LKButton
          key={i.type}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          name={i.name}
          img={i.img}
          type={i.type}
          link={i.link}
        />
      ))}
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

const LKProgress = ({ isMobile, progress }) => (
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
        percent={progress}
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
      link: "transfer",
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
      type: "add",
      link: "addPosts",
    },
    {
      name: "Архив",
      img: box,
      type: "arch",
      link: "archive",
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
      name: "Просмотр рекламы",
      img: watch,
      type: isMobile ? `watch-m` : "watch",
      link: "#watch",
    },
    {
      name: "Пользователи",
      img: icon_log,
      type: isMobile ? `users-m` : "users",
      link: "#users",
    },
  ];

  const balance = useSelector((state) => state.user.balance);
  const progress = useSelector((state) => state.user.progress);


  return (
    <div className="lk-nav">
      {isAdmin ? (
        <>
          <LKNavPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={isMobile}
            isAdmin={isAdmin}
            buttons={adminPanel_1}
            title="Действия"
          />
          <LKNavPanel
            isAdmin={isAdmin}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={isMobile}
            buttons={adminPanel_2}
            title="Статистика"
          />
        </>
      ) : (
        <>
          <BalanceBlock balance={balance} />
          <LKNavPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={isMobile}
            buttons={userPanel}
            title="Операции"
          />
          <LKProgress isMobile={isMobile} progress={progress} />
        </>
      )}
    </div>
  );
};

export default LKNav;
