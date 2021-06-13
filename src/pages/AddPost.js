import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Slider from "react-slick";
import clock from "../assets/img/brandClock.svg";
import info from "../assets/img/brandInfo.svg";
import rub from "../assets/img/brandRub.svg";
import BackArr from "../components/BackArr/BackArr";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams, useRouteMatch } from "react-router-dom";

import "./addpost.scss";
import { savePost } from "../actions/addPostActions";

const AddPost = (props) => {
  // snackbar ///////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);
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
  // / /////////////////////////////
  const dispatch = useDispatch();
  const [slides, setSlides] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const post = useSelector((state) => state.addPost);
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  const [post_t, setPost_t] = useState(post);
  const [full, setFull] = useState();

  const { params } = useRouteMatch();
  const id = params.id;

  const settings = {
    dots: true,
    focusOnSelect: true,
    infinite: false,
    slidesToShow: 1,
    speed: 500,
  };

  useEffect(() => {
    if (
      post_t.brName != "" &&
      post_t.brLink != "" &&
      post_t.time != "" &&
      post_t.price != "" &&
      post_t.text != ""
    ) {
      setFull(true);
    } else {
      setFull(false);
    }
  });

  const addFile = (e) => {
    let files = e.target.files;
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.readAsDataURL(files[0]);
      console.log(fr);
      fr.onloadend = function () {
        fr.result.substr();
        setSlides((slides) => [
          ...slides,
          { type: fr.result.substr(5, 2), data: fr.result },
        ]);
      };
    }
    document.querySelector("input[type=file]").value = "";
  };

  const fetchPost = (isArchive) => {
    let ok;
    let body = {
      brand: post_t.brName,
      url_brand: `http://${post_t.brLink}`,
      description: post_t.text,
      duration: parseFloat(post_t.time),
      coast: parseFloat(post_t.price),
      remains: 5000,
      logo: slides[0].data,
      is_published: true,
      is_archive: isArchive,
    };
    if (slides.length == 0) {
      handleClick("Загрузите изображение!", "error");
      return;
    }
    // Создаем пост ///////////////////////////////////////////////
    fetch("https://stranger-go.com/api/v1/posts/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        ok = res.ok;
        return res.json();
      })
      .then((res) => {
        if (ok) {
          slides.map((s) => {
            let media = {
              type_attachment: s.type,
              file_attachment: s.data,
            };
            const formData = new FormData();
            for (let k in media) {
              formData.append(k, media[k]);
            }
            // Загружаем изображение .///////////////////////////////////
            fetch(
              `https://stranger-go.com/api/v1/posts/${res.id}/add_attachment/`,
              {
                method: "POST",
                headers: {
                  Authorization: `Token ${token}`,
                  // Accept: "application/json",
                  // "Content-Type": "multipart/form-data",
                },
                body: formData,
              }
            ).then((res) => {
              if (res.ok) handleClick("Изображение загружено!", "success");
              else {
                handleClick("неподдерживаемый формат изображения", "error");
              }
            });
          });
          post.ques.map((q) => {
            let tmp = [];

            if (q.descr != "")
              q.answ.map((item) => {
                if (item.text != "") {
                  tmp = [
                    ...tmp,
                    {
                      text: item.text,
                      is_correct: item.is_correct,
                    },
                  ];
                }
              });

            let media = {
              post: res.id,
              text: q.descr,
              time: q.time,
              answers: tmp,
            };
      
            fetch(`https://stranger-go.com/api/v1/questions/`, {
              method: "POST",
              headers: {
                Authorization: `Token ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(media),
            })
              .then((res) => {
                if (res.ok) handleClick("Пост успешно добавлен!", "success");
                else {
                  return res.json();
                }
              })
              .then((res) => {
                // console.log(res.non_field_errors[0]);
                handleClick("Ответов должно быть 4", "error");
              });
          });
        } else {
          handleClick("Неправильно заполнены поля", "error");
        }
      });
  };

  const savePostField = (val) => {
    setPost_t({ ...post_t, ...val });
  };
  const savePostRedux = (val) => {
    handleClick("Пост успешно сохранен!", "success");
    // dispatch(savePost(post_t));
  };

  return (
    <div className="page brand-page archive-page add-post">
      <Header />
      {/* Snackbar ================================*/}
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
      {/* Snackbar ================================ */}
      <div className="archive-background">
        <div className="archive-background__item archive-background__item_main"></div>
        <div className="archive-background__item archive-background__item_1"></div>
        <div className="archive-background__item archive-background__item_2"></div>
        <div className="archive-background__item archive-background__item_3"></div>
        <div className="archive-background__item archive-background__item_4"></div>
        <div className="archive-background__item archive-background__item_5"></div>
        {isMobile ? <></> : <BackArr />}
        <div className="brand-page__content">
          <div className="brand-page__info">
            <input
              type="text"
              className="brand-page__name-input"
              placeholder="Бренд"
              defaultValue={post_t.brName}
              onChange={(e) => savePostField({ brName: e.target.value })}
            />
            <div className="brand-page__row">
              <div className="brand-page__brand">
                <img src={info} />
                <input
                  type="text"
                  className="brand-page__row-input"
                  placeholder="Бренд"
                  defaultValue={post_t.brLink}
                  onChange={(e) => savePostField({ brLink: e.target.value })}
                />
              </div>
              <div className="brand-page__time">
                <img src={clock} />
                <input
                  type="text"
                  className="brand-page__row-input"
                  placeholder="Время"
                  defaultValue={post_t.time}
                  onChange={(e) => savePostField({ time: e.target.value })}
                />
              </div>
              <div className="brand-page__price">
                <img src={rub} />
                <input
                  type="text"
                  className="brand-page__row-input"
                  placeholder="Оплата"
                  defaultValue={post_t.price}
                  onChange={(e) => savePostField({ price: e.target.value })}
                />
              </div>
            </div>
            <div className="brand-page__descr">
              <textarea
                type="text"
                className="brand-page__descr-input"
                placeholder="Описание"
                defaultValue={post_t.text}
                onChange={(e) => savePostField({ text: e.target.value })}
              />
            </div>
          </div>
          <div className="brand-page__info_m">
            <input
              type="text"
              className="brand-page__name-input"
              placeholder="Бренд"
              defaultValue={post_t.brName}
              onChange={(e) => savePostField({ brName: e.target.value })}
            />
            <div className="brand-page__row">
              <div className="brand-page__brand">
                <img src={info} />
                <input
                  type="text"
                  className="brand-page__row-input"
                  placeholder="Бренд"
                  defaultValue={post_t.brLink}
                  onChange={(e) => savePostField({ brLink: e.target.value })}
                />
              </div>
              <div className="brand-page__time">
                <img src={clock} />
                <input
                  type="text"
                  className="brand-page__row-input"
                  placeholder="Время"
                  defaultValue={post_t.time}
                  onChange={(e) => savePostField({ time: e.target.value })}
                />
              </div>
              <div className="brand-page__price">
                <img src={rub} />
                <input
                  type="text"
                  className="brand-page__row-input"
                  placeholder="Оплата"
                  defaultValue={post_t.price}
                  onChange={(e) => savePostField({ price: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="brand-page__slider">
            <input
              className=""
              type="file"
              onChange={addFile}
              onClick={addFile}
              style={{ display: "none" }}
            />
            <Slider {...settings}>
              <div
                className="brand-page__slider-item brand-page__slider-item_add"
                onClick={() => {
                  document.querySelector("input[type=file]").click();
                }}
              ></div>
              {slides.map((i, ind) => (
                <div className="brand-page__slider-item" key={ind}>
                  {i.type == "im" ? (
                    <img src={i.data} />
                  ) : (
                    <video src={i.data} height="100%" width="100%" controls />
                  )}
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="brand-page__btn-panel">
          <Link to="/addQue" className={`btn brand-page__btn que_btn`}>
            вопросы
          </Link>
          <div
            className={`btn brand-page__btn ${
              full ? "brand-page__btn_active" : ""
            }`}
            onClick={full ? () => fetchPost(true) : () => {}}
          >
            сохранить
          </div>
          <div
            className={`btn brand-page__btn ${
              full ? "brand-page__btn_active" : ""
            }`}
            onClick={full ? () => fetchPost(false) : () => {}}
          >
            опубликовать
          </div>
        </div>
        <div className="brand-page__btn-panel_m">
          <Link to="addQue" className={`btn brand-page__btn`}>
            вопросы
          </Link>
          <div className={`btn brand-page__btn`} onClick={savePostRedux}>
            сохранить
          </div>
          <div className={`btn brand-page__btn`} onClick={fetchPost}>
            готово
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
