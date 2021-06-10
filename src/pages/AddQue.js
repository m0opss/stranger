import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import win_bg from "../assets/img/WinRub.svg";
import loose_bg from "../assets/img/Loose.svg";
import { Link, NavLink, useParams } from "react-router-dom";

import "./addQue.scss";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const AddQue = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [slides, setSlides] = useState({
    0: {}
  })
  const [answers, setAnswers] = useState({});
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;

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

  const saveAn = (val, id) => {
    let tmp = { ...answers };
    tmp[id] = val;
    setAnswers(tmp);
  };

  const removeQ = () => {

  };
  const addQ = () => {

  };

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    speed: 500,
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
          <Slider {...settings}>
            <div className="">
              <div className="add-que__slide">
                <input className="add-que__name" placeholder="Вопрос" />
                <textarea
                  className="add-que__text"
                  placeholder="Формулировка вопроса"
                />
                <div className="questions__btn-block">
                  <input
                    key={`add1`}
                    onChange={(e) => saveAn(e.target.value, 0)}
                    className="questions__btn questions__btn_add btn"
                    placeholder="+"
                  />
                  <input
                    key={`add2`}
                    onChange={(e) => saveAn(e.target.value, 1)}
                    className="questions__btn questions__btn_add btn"
                    placeholder="+"
                  />
                  <input
                    key={`add3`}
                    onChange={(e) => saveAn(e.target.value, 2)}
                    className="questions__btn questions__btn_add btn"
                    placeholder="+"
                  />
                  <input
                    key={`add4`}
                    onChange={(e) => saveAn(e.target.value, 3)}
                    className="questions__btn questions__btn_add btn"
                    placeholder="+"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="add-que__slide">
                <input className="add-que__name" placeholder="Вопрос" />
                <textarea
                  className="add-que__text"
                  placeholder="Формулировка вопроса"
                />
                <div className="questions__btn-block">
                  <input
                    key={`add1`}
                    onChange={(e) => saveAn(e.target.value, 0)}
                    className="questions__btn questions__btn_add btn"
                    placeholder="+"
                  />
                  <input
                    key={`add2`}
                    onChange={(e) => saveAn(e.target.value, 1)}
                    className="questions__btn questions__btn_add btn"
                    placeholder="+"
                  />
                  <input
                    key={`add3`}
                    onChange={(e) => saveAn(e.target.value, 2)}
                    className="questions__btn questions__btn_add btn"
                    placeholder="+"
                  />
                  <input
                    key={`add4`}
                    onChange={(e) => saveAn(e.target.value, 3)}
                    className="questions__btn questions__btn_add btn"
                    placeholder="+"
                  />
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default AddQue;
