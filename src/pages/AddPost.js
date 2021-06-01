import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Slider from "react-slick";
import clock from "../assets/img/brandClock.svg";
import info from "../assets/img/brandInfo.svg";
import rub from "../assets/img/brandRub.svg";
import ReactPlayer from "react-player";

import { useSelector } from "react-redux";
import { Link, NavLink, useParams, useRouteMatch } from "react-router-dom";
import "./addpost.scss";

const AddPost = (props) => {
  const [slides, setSlides] = useState([]);
  const { params } = useRouteMatch();
  const id = params.id;

  const settings = {
    dots: true,
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 1,
    speed: 500,
  };

  const token = useSelector((state) => state.auth.token);
  // useEffect(() => {
  //   fetch("https://stranger-go.com/api/v1/games/list_attachments/", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Token ${token}`,
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((re) => {
  //       setSlides(re);
  //     });
  // }, []);
  const addFile = (e) => {
    let files = e.target.files;

    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.onloadend = function () {
        setSlides((slides) => [...slides, fr.result]);
      };
    }
  };

  return (
    <div className="page brand-page">
      <Header />
      <div className="brand-page__content">
        <div className="brand-page__info">
          <input
            type="text"
            className="brand-page__name-input"
            placeholder="Бренд"
          />
          <div className="brand-page__row">
            <div className="brand-page__brand">
              <img src={info} />
              <input
                type="text"
                className="brand-page__row-input"
                placeholder="Бренд"
              />
            </div>
            <div className="brand-page__time">
              <img src={clock} />
              <input
                type="text"
                className="brand-page__row-input"
                placeholder="Время"
              />
              мин
            </div>
            <div className="brand-page__price">
              <img src={rub} />
              <input
                type="text"
                className="brand-page__row-input"
                placeholder="Оплата"
              />
            </div>
          </div>
          <div className="brand-page__descr">
            <textarea
              type="text"
              className="brand-page__descr-input"
              placeholder="Описание"
            />
          </div>
        </div>

        <div className="brand-page__slider">
          <Slider {...settings}>
            <input
              className="brand-page__slide"
              type="file"
              onChange={addFile}
              // onClick={addFile}
            />
            {slides.map((i) => (
              <div className="brand-page__slide">
                <img src={i} />
              </div>
            ))}

            {/* {slides.map((i) => (
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
            ))} */}
          </Slider>
        </div>
      </div>
      <div className="brand-page__btn-panel">
        <Link to="addQue" className={`btn brand-page__btn`}>
          вопросы
        </Link>
        <div className={`btn brand-page__btn`}>сохранить</div>
        <div className={`btn brand-page__btn`}>опубликовать</div>
      </div>
    </div>
  );
};

export default AddPost;
