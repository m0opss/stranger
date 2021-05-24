import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import LKNav from "../components/LK/LKNav/LKNav";
import LKContent from "../components/LK/LKContent/LKContent";

import "./lk.scss";

const LK = () => {
  const [activeTab, setActiveTab] = useState("");
  const isAdmin = true;
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;

  useEffect(() => {
    if (!isMobile) {
      if (isAdmin) {
        setTimeout(() => setActiveTab("set"), 1000);
      } else {
        setTimeout(() => setActiveTab("arr"), 1000);
      }
    } else {
      setActiveTab("");
    }
  }, []);

  return (
    <div className="page lk-page">
      <Header />
      <div className="lk-page__container">
        <LKNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isAdmin={isAdmin}
          isMobile={isMobile}
          />
        <LKContent
          isAdmin={isAdmin}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default LK;
