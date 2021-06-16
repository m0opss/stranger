import React from "react";

import "./lkwatch.scss";

const WatchRow = ({ brand, date, progress, amount }) => (
  <div className="watch-block__row">
    <p className="watch-block__row-brand">{brand}</p>
    <p className="watch-block__row-date">
      {date == null || date == "" ? "-" : date}
    </p>
    <p className="watch-block__row-exe">{progress}</p>
    <p className="watch-block__row-sum">{amount}</p>
  </div>
);
const UserRow = ({ email, id, is_block, is_staff, blockUser }) => (
  <div className="watch-block__row watch-block__row_user">
    <p style={{ textAlign: "center" }} className="watch-block__row-brand">
      {id}
    </p>
    <p style={{ textAlign: "center" }} className="watch-block__row-date">
      {email}
    </p>
    <p style={{ textAlign: "center" }} className="watch-block__row-sum">
      {is_staff ? "Адм." : "Польз."}
    </p>
    <p
      style={{ textAlign: "center" }}
      className={`watch-block__row-block-btn ${
        is_block ? "watch-block__row-block-btn_unlock" : ""
      }`}
      onClick={blockUser}
    >
      {is_block ? "Lock" : "Unlock"}
    </p>
  </div>
);

const WatchBlock = ({ type, data, loadCsv, blockUser }) => {
  if (type == "users")
    return (
      <div className="lk-content__block watch-block watch-block_user">
        <a name={`users`} className="history-block__title">
          Список пользователей
        </a>
        <div className="history-block__rows-list">
          <div className="watch-block__row watch-block__row_user">
            <p
              style={{ textAlign: "center" }}
              className="watch-block__row-brand"
            >
              Id
            </p>
            <p
              style={{ textAlign: "center" }}
              className="watch-block__row-date"
            >
              Email
            </p>
            <p style={{ textAlign: "center" }} className="watch-block__row-sum">
              Тип
            </p>
            <p
              className="watch-block__row-sum"
              style={{ width: "11%", textAlign: "center" }}
            >
              Статус
            </p>
          </div>
          {data.map((el) => (
            <UserRow
              email={el.email}
              id={el.id}
              key={el.id}
              is_block={el.is_block}
              is_staff={el.is_staff}
              blockUser={() => blockUser(el.id)}
            />
          ))}
        </div>
      </div>
    );
  return (
    <div className="lk-content__block watch-block">
      <a
        name={`${type == "watch" ? "watch" : "history"}`}
        className="history-block__title"
      >
        {type == "watch" ? "Просмотр рекламы" : "История транзакций"}
      </a>
      <div className="history-block__rows-list">
        <WatchRow
          date={"Дата"}
          brand={"Бренд"}
          progress={"Прогресс,%"}
          amount={"Выплаты,₽"}
        />

        {data.length > 5
          ? data
              .slice(data.length - 6, data.length - 1)
              .map((el, i) => (
                <WatchRow
                  key={i}
                  date={el.date}
                  brand={el.brand}
                  progress={el.progress}
                  amount={el.amount != undefined ? el.amount : el.remains}
                />
              ))
          : data.map((el, i) => (
              <WatchRow
                key={i}
                date={el.date}
                brand={el.brand}
                progress={el.progress}
                amount={el.amount != undefined ? el.amount : el.remains}
              />
            ))}
      </div>

      <div className="watch-block__load" onClick={loadCsv}>
        выгрузить в Excel
      </div>
    </div>
  );
};
export default WatchBlock;
