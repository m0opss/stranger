import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import LKNav from "../components/LK/LKNav/LKNav";
import LKContent from "../components/LK/LKContent/LKContent";

import "./lk.scss";

const LK = () => {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setTimeout(() => setActiveTab("arr"), 1000);
  }, []);

  return (
    <div className="page lk-page">
      <Header />
      <div className="lk-page__container">
        <LKNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <LKContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default LK;
