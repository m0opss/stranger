import React, { useState } from "react";

import "./lkcontent.scss";
import HistoryBlock from "./LKHistory/LKHistory";
import WatchBlock from "./LKWatch/LKWatch";
import DonateBlock from "./LKDonate/LKDonateBlock";
import SettingsBlock from "./LKSettings/LKSettings";

const LKContentUser = ({
  activeTab,
  setActiveTab,
  isMobile,
  setCard,
  card,
}) => {
  return (
    <>
      {isMobile ? (
        <>
          <HistoryBlock type="mobile" />
          {activeTab != "set" ? (
            <></>
          ) : (
            <div className="lk-content">
              <SettingsBlock setActiveTab={setActiveTab} isMobile={isMobile} />
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
            <SettingsBlock setActiveTab={setActiveTab} isMobile={isMobile} />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
const LKContentAdmin = ({ activeTab, setActiveTab, isMobile }) => {
  console.log('isMobile', isMobile)
  return (
    <>
      {isMobile ? (
        <>
          {activeTab == "watch-m" ? (
            <WatchBlock type="watch" />
          ) : activeTab == "history-m" ? (
            <WatchBlock type="history" />
          ) : activeTab == "set" ? (
            <SettingsBlock
              setActiveTab={setActiveTab}
              isMobile={isMobile}
              isAdmin={true}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <div className="lk-content">
          {activeTab == "watch" ? (
            <WatchBlock />
          ) : activeTab == "history" ? (
            <WatchBlock />
          ) : activeTab == "set" ? (
            <SettingsBlock
              setActiveTab={setActiveTab}
              isMobile={isMobile}
              isAdmin={true}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

const LKContent = ({ activeTab, setActiveTab, isMobile, isAdmin }) => {
  const [card, setCard] = useState("visa");

  return (
    <>
      {isAdmin ? (
        <LKContentAdmin
          isAdmin={isAdmin}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobile={isMobile}
        />
      ) : (
        <LKContentUser
          isAdmin={isAdmin}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobile={isMobile}
          setCard={setCard}
          card={card}
        />
      )}
    </>
  );
};

export default LKContent;
