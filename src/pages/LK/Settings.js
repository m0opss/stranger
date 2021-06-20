import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";

import LKSettings from "../../components/LK/LKContent/LKSettings/LKSettings";

// import "./transfer.scss";

const Settings = ({}) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAuth = useSelector((state) => state.auth.isAuth);
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  return (
    <div className="transfer-page">
      <Header />
      <div className="lk-content">
        <LKSettings isMobile={isMobile} isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default Settings;
