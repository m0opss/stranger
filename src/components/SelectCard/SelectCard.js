import React from "react";

import icon_qiwi from "../../assets/img/LK/qiwi.png";
import icon_pay from "../../assets/img/LK/io.png";
import icon_phone from "../../assets/img/LK/phone.svg";
import m_icon_qiwi from "../../assets/img/LK/qiwi.png";
import m_icon_phone from "../../assets/img/LK/phone.svg";

import "./selectcard.scss";

const SelectCard = ({ card, type_c, onClickCard, isMobile }) => {

  if (type_c != 5) {
    return (
      <ul className="select-card">
        <li
          className={`${card == 1 ? "active" : ""}`}
          style={{
            backgroundImage: `url(${icon_qiwi})`,
          }}
        ></li>
        <li
          className={`${card == 3 ? "active" : ""}`}
          style={{ backgroundImage: `url(${icon_pay})`, backgroundSize: "90%" }}
        ></li>
        <li
          className={`${card == 2 ? "active" : ""}`}
          style={{
            backgroundImage: `url(${isMobile ? m_icon_phone : icon_phone})`,
          }}
        ></li>
      </ul>
    );
  } else {
    return (
      <ul className="select-card">
        <li
          className={`${card == 1 ? "active" : ""}`}
          onClick={() => onClickCard(1)}
          style={{
            backgroundImage: `url(${icon_qiwi})`,
          }}
        ></li>
        <li
          className={`${card == 3 ? "active" : ""}`}
          onClick={() => onClickCard(3)}
          style={{ backgroundImage: `url(${icon_pay})`, backgroundSize: "90%" }}
        ></li>
        <li
          className={`${card == 2 ? "active" : ""}`}
          onClick={() => onClickCard(2)}
          style={{
            backgroundImage: `url(${isMobile ? m_icon_phone : icon_phone})`,
          }}
        ></li>
      </ul>
    );
  }
};

export default SelectCard;
