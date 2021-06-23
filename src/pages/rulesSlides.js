import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Container from "../components/Containers/Container";

import v1 from "../assets/video/1.mov";
import v2 from "../assets/video/2.mov";
import v3 from "../assets/video/3.mov";
import v4 from "../assets/video/4.mov";

import "./rilesSlides.scss";

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

const RulesSlides = ({}) => {
  const [step, setStep] = useState(0);

  const settings = {
    dots: true,
    // focusOnSelect: true,
    infinite: false,
    slidesToShow: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current) => setStep(current),
  };

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.code == "ArrowLeft") {
        document.querySelector(".slick-prev").click();
      }
      if (event.code == "ArrowRight") {
        document.querySelector(".slick-next").click();
      }
    });
  }, []);

  return (
    <div className="page rules rules-slides">
      <Container type="dark">
        <div className="rules-bg__item_1"></div>
        <div className="rules-bg__item_2"></div>
        <div className="rules-bg__item_3"></div>
        <div className="rules-slides__slider-container">
          <p>{step + 1} ШАГ</p>
          <Slider {...settings}>
            <div className="rules-slide">
              <div className="rules-slide__img-container">
                <video src={v1} controls />
              </div>
            </div>
            <div className="rules-slide">
              <div className="rules-slide__img-container">
                <video src={v2} controls />
              </div>
            </div>
            <div className="rules-slide">
              <div className="rules-slide__img-container">
                <video src={v3} controls />
              </div>
            </div>
            <div className="rules-slide">
              <div className="rules-slide__img-container">
                <video src={v4} controls />
              </div>
            </div>
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default RulesSlides;
