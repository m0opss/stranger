import React from "react";
import "./containers.scss";

const FullContainer = ({ children }) => {
  return (
    <>
      <div className="dark-container full-container ">
        <div className="main-background__rect1" />
        <div className="main-background__rect2" />
        <div className="main-background__rect3" />
        <div className="main-background__rect4" />
        <div className="main-background__rect5" />
        <div className="main-background__circle1" />
        <div className="main-background__circle2" />
        <div className="main-background__circle3" />
        <div className="main-background__circle4" />
        <div className="main-background__circle5" />
        <div className="main-background__circle6" />
        <div className="main-background__circle7" />
      </div>
      {children}
    </>
  );
};

export default FullContainer;
