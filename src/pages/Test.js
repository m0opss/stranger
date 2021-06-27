import React, { useEffect, useState, useRef } from "react";

import Header from "../components/Header/Header";
import TestSlide from "../components/TestSlide/TestSlide";
import Slider from "react-slick";
import Swiper from "react-id-swiper";
import alien from "../assets/img/alien.svg";
import pkHelp from "../assets/img/pkHelp.svg";
import pkHelpM from "../assets/img/pkHelpM.svg";
import pkHelpSec from "../assets/img/pkHelpSec.svg";
import { useDispatch, useSelector } from "react-redux";
import { SET_FIRST_TIME, SET_FIRST_TIME_SECOND } from "../reducers/userReducer";
import "swiper/swiper.scss";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./test.scss";
import { useHistory } from "react-router";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { SET_GAME_PROGRESS } from "../reducers/gameReducer";

// поменял в package.json версию swiper с 6.7.0 на 5.3.8

function SampleNextArrow({ onClick }) {
  // const { className, style, onClick } = props;
  return (
    <button className="swiper-button-next" onClick={onClick}>
      {/* className={className} style={{ ...style }} onClick={onClick} */}
      <div className="arrow-info arrow-info_next">
        <div className="arrow-info-top"></div>
        <div className="arrow-info-bottom"></div>
      </div>
    </button>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SamplePrevArrow({ onClick }) {
  // const { className, style, onClick } = props;
  return (
    <button className="swiper-button-prev" onClick={onClick}>
      {/*className={className} style={{ ...style }}  onClick={onClick} */}
      <div className="arrow-info arrow-info_prev">
        <div className="arrow-info-top"></div>
        <div className="arrow-info-bottom"></div>
      </div>
    </button>
  );
}

const Test = ({}) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const зкщпкуыы = useSelector((state) => state.auth.isAuth);
  const first_time = useSelector((state) => state.user.first_time);
  const first_time_second = useSelector(
    (state) => state.user.first_time_second
  );
  const token = useSelector((state) => state.auth.token);
  // const history = useHistory();
  const [slides, setSlides] = useState([]);
  const dispatch = useDispatch();

  const swiperRef = useRef(null);

  const swiperSettings = {
    slidesPerView: "auto",
    effect: "coverflow",
    centeredSlides: true,
    pagination: {
      el: ".test-content__pagination",
      clickable: true,
      renderBullet: (index, className) =>
        '<span class="' + className + '">' + "&nbsp;" + "</span>",
    },
    loop: true,
    breakpoints: {
      768: {
        // spaceBetween: 50,
        coverflowEffect: {
          rotate: 0,
          stretch: -24,
          depth: 165,
          modifier: 3,
          slideShadows: false,
        },
      },
      991: {
        coverflowEffect: {
          stretch: -29,
          depth: 165,
          modifier: 3, // Effect multipler
          slideShadows: false, // Enables slides shadows
          rotate: 0,
        },
      },
      1400: {
        // spaceBetween: 34,
        coverflowEffect: {
          rotate: 0, // Slide rotate in degrees
          stretch: -42, // Stretch space between slides (in px)
          depth: 125, // Depth offset in px (slides translate in Z axis)
          modifier: 3, // Effect multipler
          slideShadows: false, // Enables slides shadows
        },
      },
    },
  };

  function positionHelp(el, set_el) {
    const { top, left, width, height } = el.getBoundingClientRect();
    set_el.style.left = left + width / 2 - 80 + "px";
    set_el.style.top = top + height / 2 + "px";
  }

  function positionHelpSec(el, set_el) {
    const { top, left } = el.getBoundingClientRect();
    set_el.style.left = left + "px";
    set_el.style.top = top + "px";
  }

  useEffect(() => {
    if (
      first_time &&
      document.querySelector(".swiper-slide-active") != null &&
      !isMobile
    ) {
      const el = document.querySelector(".swiper-slide-active");
      const set_el = document.querySelector("img.helped-container__img");

      setTimeout(() => positionHelp(el, set_el), 500);

      setTimeout(() => dispatch({ type: SET_FIRST_TIME }), 5000);
    }
    if (
      !first_time &&
      first_time_second &&
      !isMobile &&
      document.querySelector(".swiper-slide-active") != null
    ) {
      const el = document.querySelector(".swiper-slide-active").firstChild
        .childNodes[2].childNodes[1];
      const set_el = document.querySelector("img.helped-container__img_second");

      setTimeout(() => positionHelpSec(el, set_el), 500);

      setTimeout(() => dispatch({ type: SET_FIRST_TIME_SECOND }), 3000);
    }
    if (
      first_time &&
      document.querySelector(".brands-list__item") != null &&
      isMobile
    ) {
      const set_el = document.querySelector("img.helped-container__img_m");
      set_el.style.left = 50 + "vw";
      set_el.style.top = 50 + "vh";
      setTimeout(() => dispatch({ type: SET_FIRST_TIME }), 5000);
    }
    if (
      !first_time &&
      first_time_second &&
      isMobile &&
      document.querySelector(".brands-list__item") != null
    ) {
      const el =
        document.querySelector(".brands-list__item").childNodes[0].childNodes[2]
          .childNodes[1];
      const set_el = document.querySelector("img.helped-container__img_second");

      setTimeout(() => positionHelpSec(el, set_el), 100);
      setTimeout(() => dispatch({ type: SET_FIRST_TIME_SECOND }), 3000);
    }
  });

  // const token = useSelector((state) => state.auth.token);
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  const history = useHistory();
  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.code == "ArrowLeft") {
        document.querySelector(".swiper-button-prev").click();
      }
      if (event.code == "ArrowRight") {
        document.querySelector(".swiper-button-next").click();
      }
    });
  }, []);

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
              parseFloat(item.remains) >= parseFloat(item.coast)
            ) {
              res = [...res, item];
            }
          });
          setSlides(res);
        } else if (status == 401) history.push("/");
        else alert(JSON.stringify(re) + " " + status);
      });
  }, []);

  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openId, setOpenId] = React.useState();
  const [modalText, setModalText] = React.useState("");

  const [alertMsg, setAlertMsg] = React.useState();
  const [severity, setSeverity] = React.useState();

  const handleClick = (msg, severity) => {
    setAlertMsg(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const showModal = (id) => {
    setOpenModal(true);
    setOpenId(id);
  };

  const fetchDataGame = (id) => {
    fetch("https://stranger-go.com/api/v1/games/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: id,
      }),
    }).then((res) => {
      if (res.ok) {
        history.push(`/brand/${id}`);
      } else {
        res.json().then((r) => handleClick(r[Object.keys(r)[0]], "error"));
      }
    });
  };
  const startGame = (id, progress) => {
    if (isAuth) {
      dispatch({ type: SET_GAME_PROGRESS, payload: progress });
      if (progress == 100) {
        setModalText(
          "Вы уже получали вознаграждение за этот тест. Повторное прохождение не принесет вам выгоды!"
        );
        showModal(id);
      } else {
        fetchDataGame(id);
      }
    } else {
      setModalText(
        "Не авторизованные пользователи не могут вывести заработанные средства. Пожалуйста, войдите в систему или зарегистрируйтесь."
      );
      showModal(id);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    fetchDataGame(openId);
  };

  return (
    <div className="page archive-page test-page ">
      <Header />
      {first_time && !isMobile ? (
        <div
          className="helped-container"
          onClick={() => dispatch({ type: SET_FIRST_TIME })}
        >
          <img className="helped-container__img" src={pkHelp} />
        </div>
      ) : !first_time && first_time_second && !isMobile ? (
        <div
          className="helped-container"
          onClick={() => dispatch({ type: SET_FIRST_TIME_SECOND })}
        >
          <img className="helped-container__img_second" src={pkHelpSec} />
        </div>
      ) : first_time && isMobile ? (
        <div
          className="helped-container"
          onClick={() => dispatch({ type: SET_FIRST_TIME })}
        >
          <img className="helped-container__img_m" src={pkHelpM} />
        </div>
      ) : !first_time && first_time_second && isMobile ? (
        <div
          className="helped-container"
          onClick={() => dispatch({ type: SET_FIRST_TIME_SECOND })}
        >
          <img className="helped-container__img_second" src={pkHelpSec} />
        </div>
      ) : (
        <></>
      )}

      <div className="test-content">
        {slides.length > 0 && !isMobile && (
          <>
            <SamplePrevArrow
              onClick={() => swiperRef.current?.swiper.slidePrev()}
            />
            <Swiper {...swiperSettings} ref={swiperRef}>
              {slides.map((s, ind) => (
                <div className="swiper-slide" key={s.id}>
                  <TestSlide
                    id={s.id}
                    ind={ind}
                    img={s.logo}
                    name={s.brand}
                    time={s.duration}
                    progress={s.progress}
                    price={s.coast}
                    startGame={startGame}
                  />
                </div>
              ))}
            </Swiper>
            <SampleNextArrow
              onClick={() => swiperRef.current?.swiper.slideNext()}
            />
          </>
        )}
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
          {isMobile && (
            <div className="brands-list">
              {slides.map((s, ind) => (
                <div className="brands-list__item" key={s.id}>
                  <TestSlide
                    id={s.id}
                    ind={ind}
                    img={s.logo}
                    name={s.brand}
                    time={s.duration}
                    progress={s.progress}
                    price={s.coast}
                    startGame={startGame}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
        >
          {alertMsg}
        </MuiAlert>
      </Snackbar>
      <div>
        <Dialog
          open={openModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseModal}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Предупреждение"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {modalText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Ок
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Test;
