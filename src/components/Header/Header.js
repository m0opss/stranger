import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import logonMobile from "../../assets/img/logonMobile.svg";
import alienMobile from "../../assets/img/alienMobile.png";
import { Menu, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { onExitAccount } from "../../actions/authActions";
import "./header.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [innerHeader, setInnerHeader] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const email = useSelector((state) => state.auth.email);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      (pathname == "/transfer" || pathname == "/lk") &&
      window.innerWidth < 1086
    ) {
      setInnerHeader(true);
    }
  }, []);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const onExitClick = () => {
    localStorage.removeItem("token");
    dispatch(onExitAccount());
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/lk" style={{ display: "flex" }}>
          Личный кабинет
        </Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={onExitClick}>
        <p>Выйти</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <header className="header">
      <div className="container">
        {innerHeader && isAdmin ? (
          <div className="header__name">Admin</div>
        ) : innerHeader && !isAdmin ? (
          <div className="header__name">
            Привет, {email.substr(0, email.search("@"))}
          </div>
        ) : (
          <Link to="/" className="header__logo">
            <img src={logo} alt="" />
          </Link>
        )}
        <div className="header__block">
          <nav className="header__nav">
            <ul>
              <li>
                <NavLink exact to="/">
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/about">
                  О сайте
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/rules">
                  Правила
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/faq">
                  Вопросы
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/advertisers">
                  Рекламодателям
                </NavLink>
              </li>
            </ul>
          </nav>
          <nav className="header__logon">
            {isAuth ? (
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  style={{ display: "flex" }}
                >
                  <img className="header__profile-img" src={alienMobile} />
                  <p className="header__profile-name">
                    {email.substr(0, email.search("@"))}{" "}
                    <DownOutlined style={{ marginLeft: "10px" }} />
                  </p>
                </a>
              </Dropdown>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className="header__logon-btn btn btn-text"
                >
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
            <NavLink exact to="/">
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/about">
              О сайте
            </NavLink>
          </li>
          {isAdmin ? (
            <></>
          ) : (
            <li>
              <NavLink exact to="/test">
                Начать
              </NavLink>
            </li>
          )}
          <li>
            <NavLink exact to="/rules">
              Правила
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/faq">
              Вопросы
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/advertisers">
              Рекламодателям
            </NavLink>
          </li>
          <div className="header__burger-menu-logon">
            {isAuth ? (
              <div className="header__profile-block">
                <Link to="lk">
                  <img className="header__profile-img" src={alienMobile} />
                </Link>
                <div className="header__profile-text-block">
                  <Link to="lk">
                    <p className="header__profile-name">{email}</p>
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
