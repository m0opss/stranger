import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import LKNav from "../components/LK/LKNav/LKNav";
import LKContent from "../components/LK/LKContent/LKContent";

import alien from "../assets/img/alien.png";
import "./lk.scss";

const LK = () => {
  return (
    <div className="page lk-page">
      <Header />
      <div className="lk-page__container">
        <LKNav />
        <LKContent />
      </div>
    </div>
  );
};

export default LK;
