import React, { useState } from "react";
import BrandCard from "../components/BrandCard/BrandCard";
import Header from "../components/Header/Header";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import test from "../assets/img/testBrandImg.png";
import BackArr from "../components/BackArr/BackArr";

const AddPost = (props) => {
  const [brands, setBrands] = React.useState([
    { img: test, id: 0 },
    { img: test, id: 1 },
    { img: test, id: 2 },
    { img: test, id: 3 },
    { img: test, id: 4 },
  ]);

  const removeBrand = (id) => {
    setBrands((brands) => brands.filter((i) => i.id != id));
  };
  const addBrand = () => {
    setBrands((brands) => [...brands, { img: test, id: brands.length }]);
  };
  
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

          <TransitionGroup className="brands-list">
            <CSSTransition key="add" timeout={500} classNames="item">
              <div className="brands-list__item">
                <BrandCard id="add" onClick={addBrand} />
              </div>
            </CSSTransition>
            {brands.map((i) => (
              <CSSTransition
                key={i.id}
                timeout={500}
                classNames="brands-list__item"
              >
                <div className="brands-list__item">
                  <BrandCard id={i.id} img={i.img} onClick={removeBrand} />
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
