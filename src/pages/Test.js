import React from "react";

import Header from "../components/Header/Header";
import TestSlide from "../components/TestSlide/TestSlide";
import Slider from "react-slick";
import test from "../assets/img/testBrandLogo.svg";

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
  const settings = {
    className: "center",
    centerMode: true,
    dots: true,
    focusOnSelect: true,
    infinite: true,
    centerPadding: "10px",
    slidesToShow: 3,
    speed: 500,
    // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="page test-page">
      <Header />

      <div className="test-content">
        <Slider {...settings}>
          <TestSlide id={0} img={test} name={"Nike"} time={"3"} price={"10"} />
          <TestSlide id={1} img={test} name={"Nike"} time={"3"} price={"10"} />
          <TestSlide id={2} img={test} name={"Nike"} time={"3"} price={"10"} />
          <TestSlide id={3} img={test} name={"Nike"} time={"3"} price={"10"} />
          <TestSlide id={4} img={test} name={"Nike"} time={"3"} price={"10"} />
          <TestSlide id={5} img={test} name={"Nike"} time={"3"} price={"10"} />
          <TestSlide id={6} img={test} name={"Nike"} time={"3"} price={"10"} />
        </Slider>
      </div>
    </div>
  );
};

export default Test;
