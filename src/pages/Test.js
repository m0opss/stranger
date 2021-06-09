import React, { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import TestSlide from "../components/TestSlide/TestSlide";
import Slider from "react-slick";
import Swiper from "react-id-swiper";
import alien from "../assets/img/alien.svg";
import test from "../assets/img/testBrandLogo.svg";
import { useSelector } from "react-redux";

import "swiper/swiper.scss";
import "./test.scss";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <div className="arrow-info arrow-info_next">
        <div className="arrow-info-top"></div>
        <div className="arrow-info-bottom"></div>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <div className="arrow-info arrow-info_prev">
        <div className="arrow-info-top"></div>
        <div className="arrow-info-bottom"></div>
      </div>
    </div>
  );
}

const Test = ({}) => {
  const params = {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
  };
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [slides, setSlides] = useState([]);
  const token = useSelector((state) => state.auth.token);
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;

  useEffect(() => {
    fetch("https://stranger-go.com/api/v1/posts/all_post/", {
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
    <div className="page archive-page test-page ">
      <Header />
      <div className="test-content">
        <Slider {...settings}>
          {slides.map((s) => (
            <TestSlide
              id={s.id}
              key={s.id}
              img={s.logo}
              name={s.brand}
              time={s.duration}
              progress={s.progress}
              price={s.coast}
            />
          ))}
        </Slider>
        {/* <Swiper {...params}>
          {slides.map((s) => (
            <TestSlide
              id={s.id}
              key={s.id}
              img={s.logo}
              name={s.brand}
              time={s.duration}
              progress={s.progress}
              price={s.coast}
            />
          ))}
        </Swiper> */}
      </div>
      <div className="archive-background">
        <div className="archive-background__item archive-background__item_main"></div>
        <div className="archive-background__item archive-background__item_1"></div>
        <div className="archive-background__item archive-background__item_2"></div>
        <div className="archive-background__item archive-background__item_3"></div>
        <div className="archive-background__item archive-background__item_4"></div>
        <div className="archive-background__item archive-background__item_5"></div>
        <div className="test-page__mobile-content">
          {isMobile ? (
            <>
              <div className="add-page__alien">
                <img src={alien} />
              </div>
              <h1 className="add-page__title">выбери рекламу</h1>
            </>
          ) : (
            <></>
          )}
          <div className="brands-list">
            {slides.map((s) => (
              <div className="brands-list__item" key={s.id}>
                <TestSlide
                  id={s.id}
                  key={s.id}
                  img={s.logo}
                  name={s.brand}
                  time={s.duration}
                  progress={s.progress}
                  price={s.coast}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
