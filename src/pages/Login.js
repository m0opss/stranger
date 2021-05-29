import React, { useState } from "react";
import Header from "../components/Header/Header";
import Input from "../components/AuthInput/Input";

import f_arr from "../assets/img/forwardArr.svg";
import inst from "../assets/img/inst.svg";
import vk from "../assets/img/vk.svg";
import face from "../assets/img/facebook.svg";
import alien from "../assets/img/alienReg.svg";
import alien_m from "../assets/img/alien.svg";

import "./register.scss";
import { Link } from "react-router-dom";
import "./login.scss";

const Login = ({}) => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  return (
    <div className="page-auth login">
      <div className="page-auth__background page-auth__background_1"></div>
      <div className="page-auth__background page-auth__background_2"></div>
      <Header />

      <div className="page-auth__content">
        <div className="page-auth__background-item_m"></div>
        <div className="page-auth__alien_m">
          <img src={alien_m} />
        </div>
        <div className="page-auth__alien-block">
          <p className="page-auth__alien-row_1">
            Еще нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </p>
          <p className="page-auth__alien-row_2">ДОБРО ПОЖАЛОВАТЬ</p>
          <p className="page-auth__alien-row_3">
            Войди за пару секунд и забери зароботанные деньги без ввода
            конфиденциальных данных.
          </p>
          <img src={alien} />
        </div>
        <div className="page-auth__form-block  auth-form-block">
          {isMobile ? (
            <h1 className="auth-form-block__title">Войти</h1>
          ) : (
            <h1 className="auth-form-block__title">Войти</h1>
          )}
          <div className="auth-form-block__inputs">
            <Input
              value={login}
              setValue={setLogin}
              id="login"
              label="E-mail"
              helperText="Email неправильно введен."
              isValidated={true}
              placeholder="введите email"
              className="auth-form-block__input"
            />
            <Input
              value={pass}
              setValue={setPass}
              id="pass"
              label="Пароль"
              helperText="Пароль неправильно введен."
              isValidated={false}
              placeholder="введите пароль"
              className="auth-form-block__input"
            />
          </div>
          <div className="auth-form-block__reg-btn">
            <p>Зарегистрироваться</p>
            <img className="auth-form-block__reg-btn-ic" src={f_arr} />
          </div>
          <div className="auth-form-block__soc-login">
            <p>Или войдите с помощью</p>
            <div className="auth-form-block__soc-icon">
              <a href="#">
                <img src={face} />
              </a>
              <a href="#">
                <img src={vk} />
              </a>
              <a href="#">
                <img src={inst} />
              </a>
            </div>
          </div>
          {/* <div className="auth-form-block__policy">
            Регистрируясь, я принимаю <br />
            <Link to="/policy">
              Политику конфиденциальности и Договором Оферты
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Login;
