import React from "react";

import instIcon from "../../assets/img/instIcon.svg";

import "./mainFooter.scss";

const MainFooter = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__first-line">
          <div className="footer__contacts ">
            <p className="footer__title">Контакты</p>
            <p className="footer__text">+7-ХХХ-ХХХ-ХХХХ</p>
          </div>
          <div className="footer__social">
            <p className="footer__title">Присоединяйся к нам</p>
            <div className="footer__social-item">
              <img src={instIcon} />
              <p className="footer__text">instagram</p>
            </div>
          </div>
        </div>
        <div className="footer__second-line">Copyright @2021 Strangers</div>
      </div>
    </footer>
  );
};

export default MainFooter;
