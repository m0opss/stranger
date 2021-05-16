import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import "./header.scss";

const Header = ({}) => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img src={logo} alt="" />
        </Link>
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
    </header>
  );
};

export default Header;
