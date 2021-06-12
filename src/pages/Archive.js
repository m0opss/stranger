import React, { useEffect, useState } from "react";
import BrandCard from "../components/BrandCard/BrandCard";
import Header from "../components/Header/Header";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import test from "../assets/img/testBrandImg.png";
import BackArr from "../components/BackArr/BackArr";

import "./archive.scss";
import { useSelector } from "react-redux";

const Archive = ({}) => {
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  const token = useSelector((state) => state.auth.token);
  const [brands, setBrands] = useState([]);

  const removeBrand = (id) => {
    setBrands((brands) => brands.filter((i) => i.id != id));
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

  const pubBrand = (id) => {
    fetch(`https://stranger-go.com/api/v1/posts/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_archive: false }),
    })
      .then((res) => res.json())
      .then((re) => {
        console.log(re);
      });
    removeBrand(id);
  };

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
        setBrands(re.filter((item) => !item.is_archive));
      });
  }, []);

  return (
    <div className="archive-page">
      <Header />
      <div className="archive-background">
        <div className="archive-background__item archive-background__item_1"></div>
        <div className="archive-background__item archive-background__item_2"></div>
        <div className="archive-background__item archive-background__item_3"></div>
        <div className="archive-background__item archive-background__item_4"></div>
        <div className="archive-background__item archive-background__item_5"></div>
        {isMobile ? <></> : <BackArr />}
        <div className="archive-page__content">
          <h1>Архив</h1>

          <TransitionGroup className="brands-list">
            {brands.map((i) => (
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
                    опубликовать
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

export default Archive;
