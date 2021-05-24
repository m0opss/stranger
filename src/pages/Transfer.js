import React, { useState } from "react";
import Header from "../components/Header/Header";

import DonateBlock from "../components/LK/LKContent/LKDonate/LKDonateBlock";

import "./transfer.scss";

const Transfer = ({}) => {
  const [card, setCard] = useState("visa");
  return (
    <div className="transfer-page">
      <Header />
      <div className="lk-content">
        <DonateBlock setCard={setCard} card={card} />
      </div>
    </div>
  );
};

export default Transfer;
