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
            <a className="footer__text" href='tel:+79031177887'>+7-(903)-117-7887</a>
          </div>
          <div className="footer__social">
            <p className="footer__title">Присоединяйся к нам</p>
            <a
              className="footer__social-item"
              href="https://www.instagram.com/strangergocom/?utm_medium=copy_link"
              target='open'
            >
              <img src={instIcon} />
              <p className="footer__text">strangers</p>
            </a>
          </div>
        </div>
        <div className="footer__second-line">Copyright @2021 Strangers</div>
      </div>
    </footer>
  );
};

export default MainFooter;
