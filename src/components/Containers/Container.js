import React from "react";
import Header from "../Header/Header";
import DarkContainer from "./DarkContainer";

const Container = ({ type, children }) => {
  return (
    <>
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
    </>
  );
};

export default Container;
