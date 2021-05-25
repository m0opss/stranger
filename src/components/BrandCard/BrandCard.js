import React from "react";

import add_img from "../../assets/img/addBrand.svg";
import "./brandcard.scss";

const BrandCard = ({ img, onClick, id }) => {
  return (
    <div
      className={`brand-card ${id == "add" ? "add-card" : ""}`}
      onClick={id == "add" ? onClick : () => {}}
    >
      {id != "add" ? (
        <div
          className="settings-block__close-btn card-close"
          onClick={() => onClick(id)}
        >
          <span></span>
        </div>
      ) : (
        <></>
      )}
      <img src={id == "add" ? add_img : img} alt="" />
      {id}
    </div>
  );
};

export default BrandCard;
