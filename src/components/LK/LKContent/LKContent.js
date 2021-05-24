import React, { useState } from "react";

import "./lkcontent.scss";
import HistoryBlock from "./LKHistory/LKHistory";
import DonateBlock from "./LKDonate/LKDonateBlock";
import SettingsBlock from "./LKSettings/LKSettings";

const LKContent = ({ activeTab, setActiveTab }) => {
  const [card, setCard] = useState("visa");

  return (
    <>
      {window.innerWidth < 768 ? (
        <>
          <HistoryBlock type="mobile" />
          {activeTab != "set" ? (
            <></>
          ) : (
            <div className="lk-content">
              <SettingsBlock setActiveTab={setActiveTab} />
            </div>
          )}
        </>
      ) : (
        <div className="lk-content">
          {activeTab == "arr" ? (
            <DonateBlock setCard={setCard} card={card} />
          ) : activeTab == "history" ? (
            <HistoryBlock />
          ) : activeTab == "set" ? (
            <SettingsBlock setActiveTab={setActiveTab} />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default LKContent;
