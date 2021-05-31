import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Slider from "react-slick";
import clock from "../assets/img/brandClock.svg";
import info from "../assets/img/brandInfo.svg";
import rub from "../assets/img/brandrub.svg";
import ReactPlayer from "react-player";

import { Link, NavLink, useParams, useRouteMatch } from "react-router-dom";
import "./brand.scss";
import { useSelector } from "react-redux";

const Brand = (props) => {
  const [fullWatched, setWatched] = useState(false);
  const [slideN, setSlideN] = useState(0);
  const [slides, setSlides] = useState([]);
  const { params } = useRouteMatch();
  const id = params.id;

  let name = "Nike";
  let time = 3;
  let brand = "Nike";
  let descr = `Описание Описание Описание Описание Описание Описание Описание
  Описание Описание Описание Описание Описание Описание Описание
  Описание Описание Описание Описание`;
  let price = 10;

  const settings = {
    dots: true,
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 1,
    speed: 500,
    afterChange: (current) => setSlideN(current),
  };

  useEffect(() => {
    if (slides.length == slideN) {
      setWatched(true);
    }
  });
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    fetch("https://stranger-go.com/api/v1/games/list_attachments/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((re) => {
        setSlides(re);
      });
  }, []);

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
            {slides.map((i) => (
              <div className="brand-page__slider-item" key={i.id}>
                {i.type_attachment == "vi" ? (
                  <video
                    src={`https://stranger-go.com${i.file_attachment}`}
                    height="700"
                    width="700"
                    controls
                  />
                ) : i.type_attachment == "im" ? (
                  <img src={`https://stranger-go.com/${i.file_attachment}`} />
                ) : (
                  <></>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Brand;
