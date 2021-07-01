import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Slider from "react-slick";
import clock from "../assets/img/brandClock.svg";
import info from "../assets/img/brandInfo.svg";
import rub from "../assets/img/brandRub.svg";
import pkHelp from "../assets/img/pkHelp.svg";
import bransSlideArrBack from "../assets/img/bransSlideArrBack.svg";

import {
  SET_COAST,
  SET_BRAND,
  SET_GAME_PROGRESS,
} from "../reducers/gameReducer";
import { SET_FIRST_TIME_BRAND } from "../reducers/userReducer";
import { Link, NavLink, useParams, useRouteMatch } from "react-router-dom";
import "./brand.scss";
import { useDispatch, useSelector } from "react-redux";

const Brand = (props) => {
  const [fullWatched, setWatched] = useState(false);
  const [timed, setTimed] = useState(false);
  const [slideN, setSlideN] = useState(0);
  const [slides, setSlides] = useState([]);
  const [data, setData] = useState({});
  const { params } = useRouteMatch();
  const token = useSelector((state) => state.auth.token);
  const id = params.id;
  const dispatch = useDispatch();

  const first_time_brand = useSelector((state) => state.user.first_time_brand);
  useEffect(() => {
    setTimeout(() => dispatch({ type: SET_FIRST_TIME_BRAND }), 5000);
  });

  let name = data.brand;
  let time = data.duration;
  let brand = data.url_brand;
  let descr = data.description;
  let price = data.coast;
  const settings = {
    dots: true,
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 1,
    speed: 500,
    nextArrow: (
      <div className="asdasd">
        <div className="slick-arrow-next-custom"></div>
      </div>
    ),
    prevArrow: (
      <div className="asdasd">
        <div className="slick-arrow-prev-custom"></div>
      </div>
    ),
    afterChange: (current) => setSlideN(current),
  };

  useEffect(() => {
    if (slides.length == slideN + 2) {
      setWatched(true);
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (
        (event.code == "ShiftLeft" || event.code == "ShiftRight") &&
        document.querySelector(".brand-page__btn_active")
      ) {
        document.querySelector(".brand-page__btn_active").click();
      }
      if (event.code == "ArrowLeft") {
        document.querySelector(".slick-prev").click();
      }
      if (event.code == "ArrowRight") {
        document.querySelector(".slick-next").click();
      }
    });
  }, []);

  useEffect(() => {
    fetch(`https://stranger-go.com/api/v1/posts/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((re) => {
        setData(re);
        dispatch({ type: SET_COAST, payload: re.coast });
        dispatch({ type: SET_BRAND, payload: re.brand });
        // dispatch({ type: SET_BRAND, payload: re.brand });
      });
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
    <div className="page archive-page brand-page">
      <Header />
      <div className="archive-background">
        <div className="archive-background__item archive-background__item_main"></div>
        <div className="archive-background__item archive-background__item_1"></div>
        <div className="archive-background__item archive-background__item_2"></div>
        <div className="archive-background__item archive-background__item_3"></div>
        <div className="archive-background__item archive-background__item_4"></div>
        <div className="archive-background__item archive-background__item_5"></div>
        <div className="brand-page__content">
          <div className="brand-page__info">
            <h2>{name}</h2>
            <div className="brand-page__row">
              <div className="brand-page__brand">
                <img src={info} />
                <a target="_blank" href={brand}>
                  {name}
                </a>
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
              >
                ответить на вопросы
              </Link>
            ) : (
              <div className={`btn brand-page__btn`}>ответить на вопросы</div>
            )}

            <p
              className="brand-page__warning"
              style={fullWatched ? { visibility: "hidden" } : {}}
            >
              Играй после просмотра рекламы
            </p>
          </div>
          <div className="brand-page__info_m">
            <h2>{name}</h2>
            <div className="brand-page__row">
              <div className="brand-page__brand">
                <img src={info} />
                <a target="_blank" href={brand}>
                  {name}
                </a>
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
          </div>
          <div className="brand-page__slider">
            <Slider {...settings}>
              {slides.slice(1, slides.length).map((i) => (
                <div className="brand-page__slider-item" key={i.id}>
                  {first_time_brand ? (
                    <div
                      className="helped-container"
                      onClick={() => dispatch({ type: SET_FIRST_TIME_BRAND })}
                    >
                      <img className="helped-container__img" src={pkHelp} />
                    </div>
                  ) : (
                    <></>
                  )}
                  {i.type_attachment == "vi" ? (
                    <video
                      src={`https://stranger-go.com${i.file_attachment}`}
                      height="100%"
                      width="100%"
                      controls
                    />
                  ) : i.type_attachment == "im" ? (
                    <img src={`https://stranger-go.com${i.file_attachment}`} />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </Slider>
          </div>
          <div className="brand-page__info_m">
            {fullWatched ? (
              <Link
                to={`/brand/${id}/q`}
                className={`btn brand-page__btn brand-page__btn_active`}
              >
                играть
              </Link>
            ) : (
              <div className={`btn brand-page__btn`}>играть</div>
            )}

            <p
              className="brand-page__warning"
              style={fullWatched ? { display: "none" } : {}}
            >
              Играть можно начать только после просмотра презентации
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
