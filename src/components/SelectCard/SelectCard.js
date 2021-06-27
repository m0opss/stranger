import React from "react";

import icon_qiwi from "../../assets/img/LK/qiwi.png";
import icon_pay from "../../assets/img/LK/io.png";
import icon_phone from "../../assets/img/LK/phone.svg";
import m_icon_qiwi from "../../assets/img/LK/qiwi.png";
import m_icon_phone from "../../assets/img/LK/lkCardPhone.svg";

import "./selectcard.scss";

const SelectCard = ({ card, onClickCard, isMobile }) => {
  return (
    <ul className="select-card">
      <li
        className={`${card == "qiwi" ? "active" : ""}`}
        onClick={() => onClickCard("qiwi")}
        style={{
          backgroundImage: `url(${icon_qiwi})`,
        }}
      ></li>
      <li
        className={`${card == "ym" ? "active" : ""}`}
        onClick={() => onClickCard("ym")}
        style={{ backgroundImage: `url(${icon_pay})`, backgroundSize: "90%" }}
      ></li>
      <li
        className={`${card == "phone" ? "active" : ""}`}
        onClick={() => onClickCard("phone")}
        style={{
          backgroundImage: `url(${isMobile ? m_icon_phone : icon_phone})`,
        }}
      >
        
      </li>
    </ul>
  );
};

export default SelectCard;
