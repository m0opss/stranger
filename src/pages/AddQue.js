import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";

import { Link, useParams } from "react-router-dom";
import { SAVE_QUE } from "../reducers/addPostReducer";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "./addQue.scss";

const settings = {
  dots: true,
  infinite: false,
  slidesToShow: 1,
  speed: 500,
};

const QueSlide = ({ id, que, saveQue }) => (
  <div className="">
    <div className="add-que__slide">
      <input
        className="add-que__name"
        placeholder="Вопрос"
        value={que.q}
        onChange={(e) => saveQue(e.target.value, id, "q")}
      />
      <textarea
        className="add-que__text"
        placeholder="Формулировка вопроса"
        value={que.descr}
        onChange={(e) => saveQue(e.target.value, id, "decr")}
      />
      <div className="questions__btn-block">
        {que.answ.map((a) => (
          <input
            key={`add` + id + a.id}
            className="questions__btn questions__btn_add btn"
            placeholder="+"
            onChange={(e) => saveQue(e.target.value, id, "answ", a.id)}
            value={a.text}
          />
        ))}
      </div>
    </div>
  </div>
);

const AddQue = (props) => {
  const ques = useSelector((state) => state.addPost.ques);

  const dispatch = useDispatch();
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;

  const saveQue = (val, id, type, a_id) => {
    dispatch({
      type: SAVE_QUE,
      payload: { val: val, id: id, type: type, a_id: a_id },
    });
  };

  const removeQ = () => {};
  const addQ = () => {};
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
