import React, { useEffect, useState } from "react";
import BrandCard from "../components/BrandCard/BrandCard";
import Header from "../components/Header/Header";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import test from "../assets/img/testBrandImg.png";
import alien from "../assets/img/alien.svg";
import BackArr from "../components/BackArr/BackArr";

import "./addposts.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AddPosts = (props) => {
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  const [brands, setBrands] = useState([
    { img: test, id: 0 },
    { img: test, id: 1 },
    { img: test, id: 2 },
    { img: test, id: 3 },
    { img: test, id: 4 },
  ]);
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
        console.log(re);
      });
  }, []);

  const removeBrand = (id) => {
    setSlides((brands) => brands.filter((i) => i.id != id));
    fetch(`https://stranger-go.com/api/v1/posts/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((re) => {
        console.log(re);
      });
  };
  const addBrand = () => {
    setBrands((brands) => [...brands, { img: test, id: brands.length }]);
  };
  const pubBrand = (id) => {
    fetch(`https://stranger-go.com/api/v1/posts/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_archive: true }),
    }).then((res) => {
      if (res.ok) {
        alert('Пост добавлен в архив')
      } else {
        alert('Ощибка')
      }
    });

    setSlides((brands) => brands.filter((i) => i.id != id));
  };
  return (
    <div className="archive-page add-page">
      <Header />
      <div className="archive-background">
        <div className="archive-background__item archive-background__item_main"></div>
        <div className="archive-background__item archive-background__item_1"></div>
        <div className="archive-background__item archive-background__item_2"></div>
        <div className="archive-background__item archive-background__item_3"></div>
        <div className="archive-background__item archive-background__item_4"></div>
        <div className="archive-background__item archive-background__item_5"></div>
        {isMobile ? <></> : <BackArr />}
        <div className="archive-page__content">
          {isMobile ? (
            <>
              <div className="add-page__alien">
                <img src={alien} />
              </div>
              <h1 className="add-page__title">выбери игру</h1>
            </>
          ) : (
            <></>
          )}

          <TransitionGroup className="brands-list">
            <CSSTransition key="add" timeout={500} classNames="item">
              <Link className="brands-list__item" to="/addPost">
                <BrandCard
                  id="add"
                  onClick={addBrand}
                  // deletePost={deletePost}
                />
              </Link>
            </CSSTransition>
            {slides.map((i) => (
              <CSSTransition
                key={i.id}
                timeout={500}
                classNames="brands-list__item"
              >
                <div className="brands-list__item">
                  <BrandCard id={i.id} img={i.logo} onClick={removeBrand} />
                  <div
                    className="brands-list__btn btn"
                    onClick={() => pubBrand(i.id)}
                  >
                    в архив
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default AddPosts;
