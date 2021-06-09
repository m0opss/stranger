import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Progress } from "antd";
import win_bg from "../assets/img/WinRub.svg";
import loose_bg from "../assets/img/Loose.svg";
import { Link, NavLink, useParams } from "react-router-dom";

import "./addQue.scss";
import { useSelector } from "react-redux";

const AddQue = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [timing, setTiming] = useState();
  const [finished, setFinished] = useState(false);
  const [loose, setLoose] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [content, setContent] = useState({});

  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;

  useEffect(() => {}, []);

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
        {/* {[...Array(16).keys()].map((i) => (
          <div
            key={`c${i}`}
            className={`questions-page__bg questions-page__bg_c-win questions-page__bg_c${i}`}
          >
            <img src={win_bg} />
          </div>
        ))} */}
        {[...Array(3).keys()].map((i) => (
          <div
            key={`r${i}`}
            className={`questions-page__bg questions-page__bg_r-win questions-page__bg_r${i}`}
          >
            <img src={win_bg} />
          </div>
        ))}
        {/* {[...Array(7).keys()].map((i) => (
          <div
            key={`cl${i}`}
            className={`questions-page__bg questions-page__bg_c-loose questions-page__bg_cl${i}`}
          >
            <img src={loose_bg} />
          </div>
        ))} */}

        <div className="questions__container">
          <div className="questions__close"></div>

          <h2 className="questions__que">Вопрос {content.id}</h2>
          <p className="questions__descr">{content.text}</p>
          <div className="questions__btn-block">
            {/* {content.answers.map((a) => (
              <div
                key={`a${a.id}`}
                className="questions__btn btn"
                onClick={() => fetchAnsw(content.id, a.id)}
              >
                {a.text}
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQue;
