import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import logonMobile from "../../assets/img/logonMobile.svg";
import alienMobile from "../../assets/img/alienMobile.png";

import { useDispatch, useSelector } from "react-redux";
import "./header.scss";
import { onExitAccount } from "../../actions/authActions";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const onExitClick = () => {
    dispatch(onExitAccount());
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img src={logo} alt="" />
        </Link>
        <div className="header__block">
          <nav className="header__nav">
            <ul>
              <li>
                <NavLink to="/">Главная</NavLink>
              </li>
              <li>
                <NavLink to="/about">О сайте</NavLink>
              </li>
              <li>
                <NavLink to="/rules">Правила</NavLink>
              </li>
              <li>
                <NavLink to="/test">Вопросы</NavLink>
              </li>
              <li>
                <NavLink to="/about">Рекламодателям</NavLink>
              </li>
            </ul>
          </nav>
          <nav className="header__logon">
            {isAuth ? (
              <Link to="lk" style={{ display: "flex" }}>
                <img className="header__profile-img" src="" />
                <p className="header__profile-name">stranger_1</p>
              </Link>
            ) : (
              <>
                <NavLink to="/register" className="header__logon-btn btn btn-text">
                  Регистрация
                </NavLink>
                <NavLink to="/login" className="header__logon-btn btn btn-text">
                  Войти
                </NavLink>
              </>
            )}
          </nav>
        </div>
        <div className="header__burger" onClick={toggleMenu}>
          <span></span>
        </div>

        <ul className={`header__burger-menu ${menuOpen ? "menu-open" : ""}`}>
          <li className="header__close-menu-btn" onClick={toggleMenu}>
            <span></span>
          </li>
          <li>
            <Link to="/" className="header__logo">
              <img src={logo} alt="" />
            </Link>
          </li>
          <li>
            <NavLink to="/">Главная</NavLink>
          </li>
          <li>
            <NavLink to="/about">О сайте</NavLink>
          </li>
          <li>
            <NavLink to="/test">Начать</NavLink>
          </li>
          <li>
            <NavLink to="/rules">Правила</NavLink>
          </li>
          <li>
            <NavLink to="/test">Вопросы</NavLink>
          </li>
          <li>
            <NavLink to="/about">Рекламодателям</NavLink>
          </li>
          <div className="header__burger-menu-logon">
            {isAuth ? (
              <div className="header__profile-block">
                <Link to="lk">
                  <img className="header__profile-img" src="" />
                </Link>
                <div className="header__profile-text-block">
                  <Link to="lk">
                    <p className="header__profile-name">stranger_1</p>
                  </Link>
                  <p className="header__profile-exit" onClick={onExitClick}>
                    выйти
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="header__logon-login">
                  <img src={logonMobile} alt="" />
                  <p>Войти</p>
                </Link>
                <Link to="/register" className="header__logon-reg">
                  Зарегистрироваться
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Header;
