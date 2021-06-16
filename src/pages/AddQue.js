import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";

import { Link, useParams } from "react-router-dom";
import { SAVE_QUE, REMOVE_QUE, ADD_QUE } from "../reducers/addPostReducer";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "./addQue.scss";

const settings = {
  dots: true,
  infinite: false,
  slidesToShow: 1,
  speed: 500,
};

const QueSlide = ({ id, que, saveQue }) => {
  const [sec, setsec] = useState(`${que.time % 60}`.padStart(2, "0"));
  const [min, setmin] = useState(Math.floor(que.time / 60));

  const createTime = (val, flag) => {
    let time;
    if (flag) {
      time = parseFloat(sec) + parseFloat(val) * 60;
      setmin(parseFloat(val));
    } else {
      setsec(val.padStart(2, "0"));
      time = parseFloat(val) + min * 60;
    }
    console.log(time);
    saveQue(time, id, "time");
  };

  return (
    <div className="add-que__slide-wrapper" id={id}>
      <div className="add-que__slide">
        <div className="add-que__time">
          <input
            defaultValue={min}
            onBlur={(e) => createTime(e.target.value, true)}
          />
          :
          <input
            defaultValue={sec}
            onBlur={(e) => createTime(e.target.value, false)}
          />
        </div>
        <div className="add-que__name" style={{ border: "none" }}>
          Вопрос {id + 1}
        </div>
        <textarea
          className="add-que__text"
          placeholder="Формулировка вопроса"
          value={que.descr}
          onChange={(e) => saveQue(e.target.value, id, "decr")}
        />
        <p style={{ color: "red", fontWeight: "bold" }}>
          Заполните все четыре ответа!
        </p>
        <div className="questions__btn-block">
          {que.answ.map((a) => (
            <div className="questions__btn-wrapper" key={a.id}>
              <input
                key={`add` + id + a.id}
                className="questions__btn questions__btn_add btn"
                placeholder="+"
                onChange={(e) => saveQue(e.target.value, id, "answ", a.id)}
                value={a.text}
              />
              <input
                type="checkbox"
                value={a.is_correct}
                onChange={(e) =>
                  saveQue(e.target.checked, id, "answ_corr", a.id)
                }
                id={a.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AddQue = (props) => {
  const ques_redux = useSelector((state) => state.addPost.ques);

  const dispatch = useDispatch();
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;

  const removeQ = () => {
    let sl_ind = document
      .querySelector("div.slick-slide.slick-active div.add-que__slide-wrapper")
      .getAttribute("id");
    dispatch({
      type: REMOVE_QUE,
      payload: sl_ind,
    });
  };

  const addDoc = (el) => {
    document.querySelector("ul.slick-dots").appendChild(el);
  };
  const addQ = () => {
    dispatch({
      type: ADD_QUE,
    });
    let a = document.createElement("div");
    a.textContent = "+";
    a.classList.add("add");
    a.addEventListener("click", addQ);
    document.querySelector("div.add").remove();
    setTimeout(() => addDoc(a), 10);
  };
  // добавление + - в dots ////////////////////////////////////////

  useEffect(() => {
    let r = document.createElement("div");
    r.textContent = "-";
    r.classList.add("remove");

    r.addEventListener("click", removeQ);
    let a = document.createElement("div");
    a.textContent = "+";
    a.classList.add("add");

    a.addEventListener("click", addQ);
    document
      .querySelector("ul.slick-dots")
      .insertBefore(r, document.querySelector("li.slick-active"));
    document.querySelector("ul.slick-dots").appendChild(a);
  }, []);
  /////////////////////////////////////////////////////////////////
  const [ques, setQues] = useState(ques_redux);

  useEffect(() => {
    setQues(ques_redux);
  }, [ques_redux]);

  const saveQue = (val, id, type, a_id) => {
    let tmp = [...ques];

    tmp.map((item) => {
      if (item.id == id) {
        if (type == "decr") item.descr = val;
        else if (type == "time") item.time = val;
        else if (type == "answ") {
          item.answ.map((a) => {
            if (a.id == a_id) {
              a.text = val;
            }
          });
        } else if (type == "answ_corr") {
          item.answ.map((a) => {
            if (a.id == a_id) {
              a.is_correct = val;
            }
          });
        }
      }
    });
    setQues(tmp);
  };
  const saveQueRedux = () => {
    dispatch({
      type: SAVE_QUE,
      payload: ques,
    });
  };

  return (
    <div className={`page questions-page add-que green-bg`}>
      <Header />

      <div className={`questions-page__content `}>
        <div className="questions__container">
          <Link
            to="/addPost"
            className="settings-block__close-btn card-close questions__close"
          >
            <span></span>
          </Link>
          <Link
            to="/addPost"
            className="settings-block__close-btn card-close questions__save"
            onClick={saveQueRedux}
          >
            <div id="check-part-1" className="check-sign"></div>
            <div id="check-part-2" className="check-sign"></div>
          </Link>
          <Slider {...settings}>
            {ques.map((item, ind) => (
              <QueSlide
                key={item.id}
                que={item}
                id={item.id}
                saveQue={saveQue}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default AddQue;
