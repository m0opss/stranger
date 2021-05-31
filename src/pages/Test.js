import React, { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import TestSlide from "../components/TestSlide/TestSlide";
import Slider from "react-slick";
import Swiper from "react-id-swiper";
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
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
  };

  const [slides, setSlides] = useState([]);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    fetch("https://stranger-go.com/api/v1/posts/", {
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
    <div className="page test-page">
      <Header />
      <div className="test-content">
        <Swiper {...params}>
          {slides.map((s) => (
            <TestSlide
              id={s.id}
              key={s.id}
              img={s.logo}
              name={s.brand}
              time={s.duration}
              price={s.coast}
            />
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Test;
