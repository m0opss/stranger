import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Progress } from "antd";
import win_bg from "../assets/img/WinRub.svg";
import loose_bg from "../assets/img/Loose.svg";
import { Link, NavLink, useParams } from "react-router-dom";

import "./questions.scss";
import { useSelector } from "react-redux";

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
function printNumbersQue(from, to, func, perc, func2) {
  let current = from;

  let timerId = setInterval(function () {
    current--;
    func(current);
    if (current == to) {
      clearInterval(timerId);
    }
    func2((perc) => perc + 100 / from);
  }, 1000);
}

const Que = ({
  cnt,
  isMobile,
  setCnt,
  finished,
  setFinished,
  fetchAnsw,
  loose,
  content,
  setLoose,
}) => {
  const [time, setTime] = useState(content.time);
  const [percent, setPercent] = useState(0);

  const sec = `${time % 60}`.padStart(2, "0");
  const min = Math.floor(time / 60);

  useEffect(() => {
    printNumbersQue(time, 0, setTime, percent, setPercent);
  }, []);

  useEffect(() => {
    if (time == 1110) {
      setFinished(true);
      setLoose(true);
    }
  }, [time]);

  return (
    <div className="questions__container">
      <div className="questions__close"></div>
      <div className="questions__timer">
        <Progress
          type="circle"
          percent={percent}
          strokeWidth={8}
          strokeColor={"#FCD876"}
          format={() => `${min}:${sec}`}
        />
      </div>
      <h2 className="questions__que">Вопрос {content.id}</h2>
      <p className="questions__descr">{content.text}</p>
      <div className="questions__btn-block">
        {content.answers.map((a) => (
          <div
            key={`a${a.id}`}
            className="questions__btn btn"
            onClick={() => fetchAnsw(content.id, a.id)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
};

const WinContainer = ({ brand, isMobile }) => {
  return (
    <div className="win__container">
      <div className="win__cash">ты заработал</div>
      <p className="win__cost">20 ₽</p>
      <p className="win__tnx">
        Спасибо за Ваше время и внимание к {brand}, который спонсирует этот
        тест.
      </p>
      <Link to="/test" className="win__btn">
        продолжить
      </Link>
    </div>
  );
};
const LooseContainer = ({ brand, isMobile }) => {
  return (
    <div className="win__container">
      <div className="win__cash">ты заработал</div>
      <p className="win__cost">0 ₽</p>
      <p className="win__no">{isMobile ? "О НЕЕЕТ" : "Попробуй ещё раз!"}</p>
      <p className="win__tnx">
        Ты не правильно ответил на вопросы. Попробуй просмотреть рекламу ещё
        раз.
      </p>
      {/* <Link to="/test" className="win__btn">
        продолжить
      </Link> */}
    </div>
  );
};

const fetchData = (setData, token, setFinish = null) => {
  // https://stranger-go.com/api/v1/answers/
  (async () => {
    const rawResponse = await fetch(
      "https://stranger-go.com/api/v1/games/question/",
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    if (rawResponse.status == 204) {
      setFinish(true);
    } else if (rawResponse.status == 200) {
      const content = await rawResponse.json();
      setData(content);
    } else {
      const content = await rawResponse.json();
      alert(JSON.stringify(content));
    }
  })();
};

const Questions = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [timing, setTiming] = useState();
  const [finished, setFinished] = useState(false);
  const [loose, setLoose] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [content, setContent] = useState({});

  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  useEffect(() => {
    printNumbers(3, 0, setTiming);
    fetchData(setContent, token, setFinished);
  }, []);

  const fetchAnsw = (id_q, id_a) => {
    fetch("https://stranger-go.com/api/v1/games/check_answer/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: id_q, answer: id_a }),
    }).then((re) => {
      if (re.status == 200) {
        fetchData(setContent, token);
      } else {
        setFinished(true);
        setLoose(true);
      }
    });
  };

  return (
    <div
      className={`page questions-page ${timing == 0 ? "green-bg" : ""} ${
        finished && !loose
          ? "green-bg_win"
          : finished && loose
          ? "green-bg_loose"
          : ""
      }`}
    >
      <Header />
      <div className={`questions-page__content `}>
        {[...Array(16).keys()].map((i) => (
          <div
            key={`c${i}`}
            className={`questions-page__bg questions-page__bg_c-win questions-page__bg_c${i}`}
          >
            <img src={win_bg} />
          </div>
        ))}
        {[...Array(3).keys()].map((i) => (
          <div
            key={`r${i}`}
            className={`questions-page__bg questions-page__bg_r-win questions-page__bg_r${i}`}
          >
            <img src={win_bg} />
          </div>
        ))}
        {[...Array(7).keys()].map((i) => (
          <div
            key={`cl${i}`}
            className={`questions-page__bg questions-page__bg_c-loose questions-page__bg_cl${i}`}
          >
            <img src={loose_bg} />
          </div>
        ))}
        {timing != 0 ? (
          <div className="questions-page__countdown">{timing}</div>
        ) : finished && loose ? (
          <LooseContainer isMobile={isMobile} />
        ) : finished && !loose ? (
          <WinContainer isMobile={isMobile} />
        ) : (
          <Que
            isMobile={isMobile}
            finished={finished}
            setFinished={setFinished}
            fetchAnsw={fetchAnsw}
            loose={loose}
            setLoose={setLoose}
            cnt={cnt}
            setCnt={setCnt}
            content={content}
          />
        )}
      </div>
    </div>
  );
};

export default Questions;
