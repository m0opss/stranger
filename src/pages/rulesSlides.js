import React, { useState } from "react";
import Slider from "react-slick";
import Container from "../components/Containers/Container";

import "./rilesSlides.scss";

const RulesSlides = ({}) => {
  const [step, setStep] = useState(0);

  const settings = {
    dots: true,
    // focusOnSelect: true,
    infinite: false,
    slidesToShow: 1,
    speed: 500,
    afterChange: (current) => setStep(current),
  };
  return (
    <div className="page rules rules-slides">
      <Container type="dark">
        <div className="rules-slides__slider-container">
          <p>{step + 1} ШАГ</p>
          <Slider {...settings}>
            <div className="rules-slide">
              <div className="rules-slide__img-container"></div>
            </div>
            <div className="rules-slide">
              <div className="rules-slide__img-container"></div>
            </div>
            <div className="rules-slide">
              <div className="rules-slide__img-container"></div>
            </div>
            <div className="rules-slide">
              <div className="rules-slide__img-container"></div>
            </div>
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default RulesSlides;
