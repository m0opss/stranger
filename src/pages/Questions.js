import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Progress } from "antd";
import win_bg from "../assets/img/WinRub.svg";
import loose_bg from "../assets/img/Loose.svg";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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

const Que = ({ setFinished, fetchAnsw, content, setLoose, cnt }) => {
  const [time, setTime] = useState(content.time);
  const [percent, setPercent] = useState(0);

  const sec = `${time % 60}`.padStart(2, "0");
  const min = Math.floor(time / 60);

  useEffect(() => {
    // setTime(content.time);
    printNumbersQue(time, 0, setTime, percent, setPercent);
  }, []);

  useEffect(() => {
    if (time == 0) {
      setFinished(true);
      setLoose(true);
    }
  }, [time]);

  return (
    <div className="questions__container">
      <Link
        to="/test"
        className="settings-block__close-btn card-close questions__close"
      >
        <span></span>
      </Link>
      <div className="questions__timer">
        <Progress
          type="circle"
          percent={percent}
          strokeWidth={8}
          strokeColor={"#FCD876"}
          format={() => `${min}:${sec}`}
        />
      </div>
      <h2 className="questions__que">Вопрос {cnt}</h2>
      <p className="questions__descr">{content.text}</p>
      <div className="questions__btn-block">
        {content.answers ? (
          content.answers.map((a) => (
            <div
              key={`a${a.id}`}
              className="questions__btn btn"
              onClick={() => fetchAnsw(content.id, a.id)}
            >
              {a.text}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const WinContainer = ({ isAuth }) => {
  const coast = useSelector((state) => state.game.coast);
  const brand = useSelector((state) => state.game.brand);
  const progress = useSelector((state) => state.game.game_progress);
  return (
    <div className="win__container">
      <div className="win__cash">ты заработал</div>
      <p className="win__cost">{progress == 100 ? 0 : coast}₽</p>
      {isAuth && progress != 100 ? (
        <>
          <p className="win__tnx">
            Спасибо за Ваше время и внимание к {brand}, который спонсирует этот
            тест.
          </p>
          <Link to="/test" className="win__btn">
            продолжить
          </Link>
        </>
      ) : isAuth && progress == 100 ? (
        <>
          <p className="win__tnx">
            Вы уже получали награду за этот тест! Пожалуйста, прочитайте
            правила.
          </p>
          <Link to="/rules" className="win__btn">
            Правила
          </Link>
        </>
      ) : (
        <>
          <p className="win__tnx">
            Для вывода заработанных средств, пожалуйста, войдите в систему или
            зарегистрируйтесь
          </p>
          <Link to="/register" className="win__btn">
            Зарегистрироваться
          </Link>
        </>
      )}
    </div>
  );
};
const LooseContainer = ({ brand, isMobile }) => {
  return (
    <div className="questions__container win__container">
      <Link
        to="/test"
        className="settings-block__close-btn card-close questions__close"
      >
        <span></span>
      </Link>
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

const Questions = (props) => {
  const [open, setOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState();
  const [severity, setSeverity] = React.useState();

  const fetchData = (
    setData,
    token,
    history,
    printNumbers,
    setFinish = null
  ) => {
    (async () => {
      const rawResponse = await fetch(
        "/api/v1/games/question/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (rawResponse.status == 204 || rawResponse.status == 208) {
        setFinish(true);
      } else if (rawResponse.status == 200) {
        const content = await rawResponse.json();
        setData(content);
        // printNumbers();
      } else {
        const content = await rawResponse.json();
        handleClick(content[Object.keys(content)[0]], "error");
        setTimeout(() => history.push("/test"), 2000);
      }
    })();
  };
  const handleClick = (msg, severity) => {
    setAlertMsg(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const [timing, setTiming] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [finished, setFinished] = useState(false);
  const [loose, setLoose] = useState(false);
  const [cnt, setCnt] = useState(1);
  const [content, setContent] = useState({});
  const history = useHistory();
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;

  useEffect(() => {
    // printNumbers(3, 0, setTiming);
    fetchData(
      setContent,
      token,
      history,
      () => printNumbers(3, 0, setTiming),
      setFinished
    );
    printNumbers(3, 0, setTiming);
  }, []);

  const fetchAnsw = (id_q, id_a) => {
    setCnt((cnt) => cnt + 1);
    fetch("/api/v1/games/check_answer/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: id_q, answer: id_a }),
    }).then((re) => {
      if (re.status == 200) {
        fetchData(setContent, token, history, () => {}, setFinished);
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
        >
          {alertMsg}
        </MuiAlert>
      </Snackbar>
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
          <>
            <div className="questions-page__bg_rtg questions-page__bg-item_1"></div>
            <div className="questions-page__bg_rtg questions-page__bg-item_2"></div>
            <div className="questions-page__bg_rtg questions-page__bg-item_3"></div>
            <div className="questions-page__bg_rtg questions-page__bg-item_4"></div>
            <div className="questions-page__bg_rtg questions-page__bg-item_5"></div>
            <div className="questions-page__bg_rtg questions-page__bg-item_6"></div>
            <div className="questions-page__bg_rtg questions-page__bg-item_7"></div>
            <div className="questions-page__bg_rtg questions-page__bg-item_8"></div>
            <div className="questions-page__bg_rtg questions-page__bg-item_9"></div>
            <div className="questions-page__countdown">
              <p className="run">Поехали!</p>
              <div className="questions-page__countdown-counter">
                <ul>
                  <li>
                    <div>
                      <p>{timing}</p>
                    </div>
                    <div>
                      <p>{timing}</p>
                    </div>
                    <div>
                      <p>{timing}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : finished && loose ? (
          <LooseContainer isMobile={isMobile} />
        ) : finished && !loose ? (
          <WinContainer isAuth={isAuth} />
        ) : (
          <>
            <div className="questions-page__bg_rtg questions-page__bg-item_1"></div>
            <div className="questions-page__bg_rtg questions-page__bg-item_3"></div>
            <div className="questions-page__bg_rtg questions-page__bg-item_6"></div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Questions;
