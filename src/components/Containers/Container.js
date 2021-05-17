import React from "react";
import Header from "../Header/Header";
import DarkContainer from "./DarkContainer";

const Container = ({ type, children }) => {
  return (
    <div className="main-container">
      {type == "dark" ? (
        <DarkContainer>
          <Header />
          {children}
        </DarkContainer>
      ) : type == "light1" ? (
        <DarkContainer>
          <Header />
          {children}
        </DarkContainer>
      ) : (
        <DarkContainer>
          <Header />
          {children}
        </DarkContainer>
      )}
    </div>
  );
};

export default Container;
