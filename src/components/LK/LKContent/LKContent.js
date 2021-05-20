import React, { useState } from "react";

import "./lkcontent.scss";
import HistoryBlock from "./LKHistory/LKHistory";
import DonateBlock from "./LKDonate/LKDonateBlock";
import SettingsBlock from "./LKSettings/LKSettings";



const LKContent = ({ activeTab }) => {
  const [card, setCard] = useState("visa");

  return (
    <div className="lk-content">
      {activeTab == "arr" ? (
        <DonateBlock setCard={setCard} card={card} />
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
