import React, { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import TestSlide from "../components/TestSlide/TestSlide";
import Slider from "react-slick";
import alien from "../assets/img/alien.svg";
import { useSelector } from "react-redux";

import "swiper/swiper.scss";
import "./test.scss";
import { useHistory } from "react-router";

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
  console.log(settings);
  const [slides, setSlides] = useState([]);
  const settings = {
    className: `center ${slides.length < 3 ? "centered-slide" : ""}`,
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: slides.length > 3 ? 3 : slides.length > 2 ? 2 : 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1310,
        settings: {
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 1185,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  console.log(settings);
  const token = useSelector((state) => state.auth.token);
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  const history = useHistory();
  useEffect(() => {
    let ok, status;
    fetch("https://stranger-go.com/api/v1/posts/all_post/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        status = res.status;
        ok = res.ok;
        return res.json();
      })
      .then((re) => {
        if (ok) {
          let res = []
          re.map(item => {
            if(!item.is_archive && parseFloat(item.remains) > parseFloat(item.coast)) {
              res = [...res, item]
            }
          })
          setSlides(res);
        } else if (status == 401) history.push("/");
        else alert(JSON.stringify(re) + " " + status);
      });
  }, []);
  console.log(123123213, slides);
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
