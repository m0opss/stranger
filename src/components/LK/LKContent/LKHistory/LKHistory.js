import React from "react";

import "./lkhistory.scss";

const HistoryRow = ({ date, card, sum }) => (
  <div className="history-block__row">
    <p className="history-block__row-date">{date}</p>
    <p className="history-block__row-card">{card}</p>
    <p className="history-block__row-sum">{sum}</p>
  </div>
);

const HistoryBlock = ({ type }) => (
  <div className="lk-content__block history-block">
    <a name="history" className="history-block__title">
      История транзакций
    </a>
    <div className="history-block__rows-list">
      <HistoryRow date="02.02.21" card="**** 9999" sum="100₽" />
      <HistoryRow date="02.02.21" card="**** 9999" sum="100₽" />
      <HistoryRow date="02.02.21" card="**** 9999" sum="100₽" />
      <HistoryRow date="02.02.21" card="**** 9999" sum="100₽" />
      <HistoryRow date="02.02.21" card="**** 9999" sum="100₽" />
    </div>
  </div>
);
export default HistoryBlock;
