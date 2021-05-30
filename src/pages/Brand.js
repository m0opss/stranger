import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Slider from "react-slick";
import clock from "../assets/img/brandClock.svg";
import info from "../assets/img/brandInfo.svg";
import rub from "../assets/img/brandrub.svg";
import test from "../assets/img/testBrandImg.png";
import { Link, NavLink, useParams, useRouteMatch } from "react-router-dom";
import "./brand.scss";

const Brand = (props) => {
  const [fullWatched, setWatched] = useState(false);
  const [slideN, setSlideN] = useState(0);
  const { params } = useRouteMatch();
  const id = params.id;

  let name = "Nike";
  let time = 3;
  let brand = "Nike";
  let descr = `Описание Описание Описание Описание Описание Описание Описание
  Описание Описание Описание Описание Описание Описание Описание
  Описание Описание Описание Описание`;
  let price = 10;
  const len = 3;
  const settings = {
    dots: true,
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 1,
    speed: 500,
    afterChange: (current) => setSlideN(current),
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    if (len == slideN) {
      setWatched(true);
    }
  });

  return (
    <div className="page brand-page">
      <Header />
      <div className="brand-page__content">
        <div className="brand-page__info">
          <h2>{name}</h2>
          <div className="brand-page__row">
            <div className="brand-page__brand">
              <img src={info} />
              {brand}
            </div>
            <div className="brand-page__time">
              <img src={clock} />
              {time} мин
            </div>
            <div className="brand-page__price">
              <img src={rub} />
              {price}
            </div>
          </div>
          <div className="brand-page__descr">{descr}</div>
          {fullWatched ? (
            <Link
              to={`/brand/${id}/q`}
              className={`btn brand-page__btn brand-page__btn_active`}
              style={{ marginBottom: 0 }}
            >
              ответить на вопросы
            </Link>
          ) : (
            <div className={`btn brand-page__btn`}>ответить на вопросы</div>
          )}

          {fullWatched ? (
            <></>
          ) : (
            <p className="brand-page__warning">
              Играть можно начать только после просмотра презентации/видео
              ролика
            </p>
          )}
        </div>

        <div className="brand-page__slider">
          <Slider {...settings}>
            <div className="brand-page__slider-item">
              <img src={test} />
            </div>
            <div className="brand-page__slider-item">
              <img src={test} />
            </div>
            <div className="brand-page__slider-item">
              <img src={test} />
            </div>
            <div className="brand-page__slider-item">
              <img src={test} />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Brand;
