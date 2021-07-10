import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import LKNav from "../components/LK/LKNav/LKNav";
import LKContent from "../components/LK/LKContent/LKContent";

import "./lk.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../actions/authActions";

const LK = () => {
  const [activeTab, setActiveTab] = useState("");
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const dispatch = useDispatch();
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;

  useEffect(() => {
    dispatch(getMe(token));
    if (!isMobile) {
      if (isAdmin) {
        setActiveTab("set");
        // setTimeout(() => setActiveTab("set"), 1000);
      } else {
        setActiveTab("arr");
        // setTimeout(() => setActiveTab("arr"), 1000);
      }
    } else {
      setActiveTab("");
    }
  }, []);

  if (isAuth) {
    return (
      <div
        className="page lk-page"
        style={isMobile ? { background: "#FBFBFB" } : {}}
      >
        <Header />
        <div
          className="lk-page__container"
          style={
            isAdmin && isMobile
              ? { paddingLeft: "20px", paddingRight: "20px" }
              : {}
          }
        >
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
  }
  return <Redirect to="/" />;
};

export default LK;
