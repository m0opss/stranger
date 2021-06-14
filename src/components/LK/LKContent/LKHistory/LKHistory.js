import React from "react";

import "./lkhistory.scss";

const HistoryRow = ({ date, card, sum }) => (
  <div className="history-block__row">
    <p className="history-block__row-date">{date}</p>
    <p className="history-block__row-card">{card}</p>
    <p className="history-block__row-sum">{sum}</p>
  </div>
);

const HistoryBlock = ({ type, data }) => (
  <div className="lk-content__block history-block">
    <a name="history" className="history-block__title">
      История транзакций
    </a>
    <div className="history-block__rows-list">
      <HistoryRow date="Дата" card="Счет" sum="Сумма" />
      {data == undefined || data.length == 0 ? (
        <HistoryRow date="-" card="-" sum="-" />
      ) : (
        <></>
      )}
      {data ? (
        data.map((item) => (
          <HistoryRow
            date={item.date.substr(0, 10)}
            card={item.account_number.substr(0, 9)}
            sum={
              item.type_operations == "inc" ? "+" + item.amount : "-" + item.amount
            }
          />
        ))
      ) : (
        <></>
      )}
    </div>
  </div>
);
export default HistoryBlock;
