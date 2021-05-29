import React from "react";

import icon_qiwi from "../../assets/img/LK/lkCardQiwi.svg";
import icon_pay from "../../assets/img/LK/lkCardPay.svg";
import icon_phone from "../../assets/img/LK/lkCardPhone.svg";

import m_icon_qiwi from "../../assets/img/LK/lkCardQiwiM.svg";
import m_icon_pay from "../../assets/img/LK/lkCardPayM.png";
import m_icon_phone from "../../assets/img/LK/lkCardPhoneM.png";

import "./selectcard.scss";

const SelectCard = ({ card, onClickCard, isMobile }) => {
  return (
    <ul className="select-card">
      <li
        className={`${card == "qiwi" ? "active" : ""}`}
        onClick={() => onClickCard("qiwi")}
        style={{
          backgroundImage: `url(${isMobile ? m_icon_qiwi : icon_qiwi})`,
        }}
      ></li>
      <li
        className={`${card == "pay" ? "active" : ""}`}
        onClick={() => onClickCard("pay")}
        style={{ backgroundImage: `url(${isMobile ? m_icon_pay : icon_pay})` }}
      ></li>
      <li
        className={`${card == "phone" ? "active" : ""}`}
        onClick={() => onClickCard("phone")}
        style={{
          backgroundImage: `url(${isMobile ? m_icon_phone : icon_phone})`,
        }}
      ></li>
    </ul>
  );
};

export default SelectCard;
