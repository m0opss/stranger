import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";

import HistoryBlock from "../../components/LK/LKContent/LKHistory/LKHistory";


const History = ({}) => {
  const transaction_history = useSelector(
    (state) => state.user.transaction_history
  );
  return (
    <div className="transfer-page">
      <Header />
      <div className="lk-content">
        <HistoryBlock data={transaction_history} />
      </div>
    </div>
  );
};

export default History;
