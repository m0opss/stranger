import React from "react";
import Header from "../Header/Header";
import DarkContainer from "./DarkContainer";
import FullContainer from "./FullContainer";

const Container = ({ type, children }) => {
  return (
    <div className="main-container">
      {type == "dark" ? (
        <DarkContainer>
          <Header />
          {children}
        </DarkContainer>
      ) : type == "lk" ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <FullContainer>
          <Header />
          {children}
        </FullContainer>
      )}
    </div>
  );
};

export default Container;
