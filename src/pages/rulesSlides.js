import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Container from "../components/Containers/Container";

import v1 from "../assets/rules/1.png";
import v2 from "../assets/rules/2.png";
import v3 from "../assets/rules/3.png";
import v4 from "../assets/rules/4.png";

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
        <div className="arrow-info-top"></div>img
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
                <img src={v1} />
              </div>
            </div>
            <div className="rules-slide">
              <div className="rules-slide__img-container">
                <img src={v2} />
              </div>
            </div>
            <div className="rules-slide">
              <div className="rules-slide__img-container">
                <img src={v3} />
              </div>
            </div>
            <div className="rules-slide">
              <div className="rules-slide__img-container">
                <img src={v4} />
              </div>
            </div>
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default RulesSlides;
