import React from "react";

import "./lkwatch.scss";

const WatchRow = ({ brand, date, exe, sum }) => (
  <div className="watch-block__row">
    <p className="watch-block__row-brand">{brand}</p>
    <p className="watch-block__row-date">{date}</p>
    <p className="watch-block__row-exe">{exe}</p>
    <p className="watch-block__row-sum">{sum}</p>
  </div>
);

const WatchBlock = ({ type }) => (
  <div className="lk-content__block watch-block">
    <a
      name={`${type == "watch" ? "watch" : "history"}`}
      className="history-block__title"
    >
      {type == "watch" ? "Просмотр рекламы" : "История транзакций"}
    </a>
    <div className="history-block__rows-list">
      <WatchRow date="02.02.21" brand="Nike" exe="100%" sum="+100₽" />
      <WatchRow date="02.02.21" brand="Nike" exe="100%" sum="+100₽" />
      <WatchRow date="02.02.21" brand="Nike" exe="100%" sum="+100₽" />
      <WatchRow date="02.02.21" brand="Nike" exe="100%" sum="+100₽" />
      <WatchRow date="02.02.21" brand="Nike" exe="100%" sum="+100₽" />
    </div>
  </div>
);
export default WatchBlock;
