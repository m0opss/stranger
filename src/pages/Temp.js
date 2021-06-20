import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Swiper from "react-id-swiper";
import TestSlide from "../components/TestSlide/TestSlide";
import { useSelector } from "react-redux";
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
  const [slides, setSlides] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const history = useHistory();


  const settings = {
    className: `center ${slides.length < 3 ? "centered-slide" : ""}`,
    dots: true,
    centerMode: true,
    // infinite: false,
    centerPadding: "100px",
    // slidesToShow: slides.length > 3 ? 3 : slides.length > 2 ? 2 : 1,
    slidesToShow: 3,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 0,
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
  useEffect(() => {
    let ok, status;
    fetch("https://stranger-go.com/api/v1/posts/all_post/", {
      method: "GET",
      headers:
        token != ""
          ? {
              Authorization: `Token ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          : {
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
          let res = [];
          re.map((item) => {
            if (
              !item.is_archive &&
              parseFloat(item.remains) > parseFloat(item.coast)
            ) {
              res = [...res, item];
            }
          });
          setSlides(res);
        } else if (status == 401) history.push("/");
        else alert(JSON.stringify(re) + " " + status);
      });
  }, []);
  return (
    <div className="test-content">
      {/* <Swiper {...params}>
        {slides.map((s, ind) => (
          <TestSlide
            id={s.id}
            key={s.id}
            isAuth={isAuth}
            ind={ind}
            img={s.logo}
            name={s.brand}
            time={s.duration}
            progress={s.progress}
            price={s.coast}
          />
        ))}
      </Swiper> */}

      <Slider {...settings}>
        {slides.map((s, ind) => (
          <TestSlide
            id={s.id}
            key={s.id}
            isAuth={isAuth}
            ind={ind}
            img={s.logo}
            name={s.brand}
            time={s.duration}
            progress={s.progress}
            price={s.coast}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Test;
