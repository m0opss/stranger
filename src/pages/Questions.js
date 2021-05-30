import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";

import test from "../assets/img/testBrandImg.png";
import { Link, NavLink, useParams } from "react-router-dom";

import "./questions.scss";

function printNumbers(from, to, func) {
  let current = from;

  let timerId = setInterval(function () {
    func(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current--;
  }, 1000);
}

const QueContainer = ({
  cnt,
  setCnt,
  finished,
  setFinished,
  loose,
  setLoose,
}) => {
  const [answer, setAnswer] = useState({});
  console.log(finished);
  return (
    <div className="questions__container">
      <div className="questions__close"></div>
      <div className="questions__timer"></div>
      <h2 className="questions__que">Вопрос 1</h2>
      <p className="questions__descr">
        Формулировка самого вопроса Формулировка самого вопроса
      </p>
      <div className="questions__btn-block">
        <div
          className="questions__btn btn"
          setFinished={() => setFinished(true)}
        >
          вариант 1
        </div>
        <div className="questions__btn btn">вариант 2</div>
        <div className="questions__btn btn">вариант 3</div>
        <div className="questions__btn btn">вариант 4</div>
      </div>
    </div>
  );
};
const WinContainer = ({ brand }) => {
  const [answer, setAnswer] = useState({});

  return (
    <div className="win__container">
      <div className="win__cash">ты заработал</div>
      <p className="win__cost">20 ₽</p>
      <p className="win__tnx">
        Спасибо за Ваше время и внимание к {brand}, который спонсирует этот
        тест.
      </p>
      <Link to='/test' className="win__btn">продолжить</Link>
    </div>
  );
};

const Questions = (props) => {
  const [timing, setTiming] = useState(0);
  const [finished, setFinished] = useState(true);
  const [loose, setLoose] = useState(false);
  const [cnt, setCnt] = useState(0);

  // useEffect(() => {
  //   printNumbers(3, 0, setTiming);
  // }, []);

  return (
    <div className={`page questions-page ${timing == 0 ? "green-bg" : ""}`}>
      <Header />
      <div className={`questions-page__content `}>
        {timing != 0 ? (
          <div className="questions-page__countdown">{timing}</div>
        ) : finished && loose ? (
          <div className="">lose</div>
        ) : finished && !loose ? (
          <WinContainer />
        ) : (
          <QueContainer
            cnt={cnt}
            setCnt={setCnt}
            finished={finished}
            setFinished={setFinished}
            loose={loose}
            setLoose={setLoose}
          />
        )}
      </div>
    </div>
  );
};

export default Questions;
