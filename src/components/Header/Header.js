import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import logonMobile from "../../assets/img/logonMobile.svg";
import alienMobile from "../../assets/img/alienMobile.png";
import "./header.scss";

const Header = ({}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
                <NavLink to="/about">Правила</NavLink>
              </li>
              <li>
                <NavLink to="/about">Вопросы</NavLink>
              </li>
              <li>
                <NavLink to="/about">Рекламодателям</NavLink>
              </li>
            </ul>
          </nav>
          <nav className="header__logon">
            <div className="header__logon-btn btn btn-text">Регистрация</div>
            <div className="header__logon-btn btn btn-text">Войти</div>
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
            <NavLink to="/about">Начать</NavLink>
          </li>
          <li>
            <NavLink to="/about">Правила</NavLink>
          </li>
          <li>
            <NavLink to="/about">Вопросы</NavLink>
          </li>
          <li>
            <NavLink to="/about">Рекламодателям</NavLink>
          </li>
          <div className="header__burger-menu-logon">
            <Link to="/" className="header__logon-login">
              <img src={logonMobile} alt="" />
              <p>Войти</p>
            </Link>
            <Link to="/" className="header__logon-reg">
              Зарегистрироваться
            </Link>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Header;
