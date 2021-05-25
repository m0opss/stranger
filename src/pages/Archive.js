import React, { useState } from "react";
import BrandCard from "../components/BrandCard/BrandCard";
import Header from "../components/Header/Header";

import test from "../assets/img/testBrandImg.png";

import "./archive.scss";
import BackArr from "../components/BackArr/BackArr";

const brands = [
  { img: test, id: 0 },
  { img: test, id: 1 },
  { img: test, id: 2 },
  { img: test, id: 3 },
  { img: test, id: 4 },
  { img: test, id: 5 },
];

const Archive = ({}) => {
  return (
    <div className="archive-page">
      <Header />
      <div className="archive-background">
        <div className="archive-background__item archive-background__item_1"></div>
        <div className="archive-background__item archive-background__item_2"></div>
        <div className="archive-background__item archive-background__item_3"></div>
        <div className="archive-background__item archive-background__item_4"></div>
        <div className="archive-background__item archive-background__item_5"></div>
        <BackArr />
        <div className="archive-page__content">
          <h1>Архив</h1>
          <div className="brands-list">
            {brands.map((i) => (
              <div className="brands-list__item" key={i.id}>
                <BrandCard id={i.id} img={i.img} />
                <div className="brands-list__btn btn" onClick={() => {}}>
                  опубликовать
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archive;
