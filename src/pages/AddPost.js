import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Slider from "react-slick";
import clock from "../assets/img/brandClock.svg";
import info from "../assets/img/brandInfo.svg";
import rub from "../assets/img/brandRub.svg";

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams, useRouteMatch } from "react-router-dom";
import "./addpost.scss";
import { savePost } from "../actions/addPostActions";

const AddPost = (props) => {
  const dispatch = useDispatch();
  const [slides, setSlides] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const post = useSelector((state) => state.addPost);
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

  // useEffect(() => {
  //   fetch("https://stranger-go.com/api/v1/games/list_attachments/", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Token ${token}`,
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((re) => {
  //       setSlides(re);
  //     });
  // }, []);
  const addFile = (e) => {
    let files = e.target.files;

    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.onloadend = function () {
        setSlides((slides) => [...slides, fr.result]);
      };
    }
  };

  const fetchPost = () => {
    let body = {
      brand: post_t.brName,
      url_brand: `http://${post_t.brLink}`,
      description: post_t.text,
      duration: parseFloat(post_t.time),
      coast: parseFloat(post_t.price),
      remains: 5000,
      is_published: true,
      is_archive: false,
    };

    fetch("https://stranger-go.com/api/v1/posts/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const savePostField = (val) => {
    setPost_t({ ...post_t, ...val });
  };
  const savePostRedux = (val) => {
    dispatch(savePost(post_t));
  };

  return (
    <div className="page brand-page add-post">
      <Header />
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
              мин
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
          <Slider {...settings}>
            <input
              className="brand-page__slider-item brand-page__slider-item_add"
              type="file"
              onChange={addFile}
              onClick={addFile}
            />

            {slides.map((i) => (
              <div className="brand-page__slider-item">
                <img src={i} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="brand-page__btn-panel">
        <Link to="addQue" className={`btn brand-page__btn`}>
          вопросы
        </Link>
        <div
          className={`btn brand-page__btn ${
            full ? "brand-page__btn_active" : ""
          }`}
          onClick={full ? savePostRedux : () => {}}
        >
          сохранить
        </div>
        <div
          className={`btn brand-page__btn ${
            full ? "brand-page__btn_active" : ""
          }`}
          onClick={full ? fetchPost : () => {}}
        >
          опубликовать
        </div>
      </div>
    </div>
  );
};

export default AddPost;
