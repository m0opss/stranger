import React from "react";
import './mainBackground.scss'

const MainBackground = () => {
  return (
    <div className="main-background">
      <div className="dark-half">
        <div className="main-background__rect1"></div>
        <div className="main-background__circle1"></div>
      </div>
      {/* <div className="light-half"></div> */}
    </div>
  );
};

export default MainBackground;
