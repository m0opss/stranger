import React, { useState } from "react";
import Header from "../components/Header/Header";
import Input from "../components/AuthInput/Input";
import { Modal, Button } from "antd";
import f_arr from "../assets/img/forwardArr.svg";
import inst from "../assets/img/inst.svg";
import vk from "../assets/img/vk.svg";
import face from "../assets/img/facebook.svg";
import alien from "../assets/img/alienReg.svg";
import alien_m from "../assets/img/alien.svg";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./register.scss";
import { Link, useHistory } from "react-router-dom";
import SelectCard from "../components/SelectCard/SelectCard";
import { handleLoginFace, handleLoginVK } from "../actions/authActions";


import isEmail from "validator/es/lib/isEmail";
import { useDispatch } from "react-redux";

const Register = ({}) => {
  const [login, setLogin] = useState("");
  const [login_correct, setLogin_correct] = useState(true);
  const [pass, setPass] = useState("");
  const [pass_correct, setPass_correct] = useState(true);
  const [passAlso, setPassAlso] = useState("");
  const [passAlso_correct, setPassAlso_correct] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const validate = () => {
    let flag = true;

    if (!isEmail(login)) {
      setLogin_correct(false);
      flag = false;
    } else {
      setLogin_correct(true);
    }
    if (passAlso !== pass) {
      setPass_correct(false);
      setPassAlso_correct(false);
      flag = false;
    } else {
      setPass_correct(true);
      setPassAlso_correct(true);
    }
    if (pass.length < 5) {
      setPass_correct(false);
      flag = false;
    } else {
      setPass_correct(true);
    }
    return flag;
  };

  function info(login) {
    Modal.info({
      title: "Подтверждение регистрации",
      content: (
        <div>
          <p>
            На вашу электронную почту {login} отправлено письмо со ссылкой
            активации.
            <br />
            <span style={{ fontSize: "12px", color: "#cacaca" }}>
              Если не можете найти письмо, проверьте папку спам
            </span>
          </p>
        </div>
      ),
      onOk() {
        history.push("/login");
      },
    });
  }
  const [open, setOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState();
  const [severity, setSeverity] = React.useState();

  const handleClick = (msg, severity) => {
    setAlertMsg(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const fetchData = () => {
    if (validate()) {
      (async () => {
        const rawResponse = await fetch(
          "https://stranger-go.com/api/v1/users/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: login,
              password: pass,
              re_password: passAlso,
            }),
          }
        );
        if (rawResponse.ok) {
          const content = await rawResponse.json();
          info(login);
        } else {
          const err = await rawResponse.json();
          handleClick(err[Object.keys(err)[0]], "error");
        }
      })();
    }
  };
  let isMobile = false;
  if (window.innerWidth < 768) isMobile = true;
  const [checked, setChecked] = useState(false);

  const vk_auth = () => {
    dispatch(handleLoginVK(handleClick));
  };
  const face_auth = () => {
    dispatch(handleLoginFace(handleClick));
  };

  return (
    <div className="page-auth register">
      <div className="page-auth__background page-auth__background_1"></div>
      <div className="page-auth__background page-auth__background_2"></div>
      <div className="page-auth__background page-auth__background_2_m"></div>
      <div className="page-auth__background page-auth__background_3"></div>
      <div className="page-auth__background page-auth__background_4"></div>
      <Header />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
        >
          {alertMsg}
        </MuiAlert>
      </Snackbar>
      <div className="page-auth__content">
        <div className="page-auth__background-item_m"></div>
        <div className="page-auth__alien_m">
          <img src={alien_m} />
        </div>
        <div className="page-auth__alien-block">
          <p className="page-auth__alien-row_1">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </p>
          <p className="page-auth__alien-row_2">БЕСПЛАТНАЯ РЕГИСТРАЦИЯ</p>
          <p className="page-auth__alien-row_3">
            Зарегистрируйся за пару минут и получи свои деньги без ввода
            конфиденциальных данных.
          </p>
        </div>
        <div className="page-auth__form-block  auth-form-block">
          {isMobile ? (
            <h1 className="auth-form-block__title">Добро пожаловать</h1>
          ) : (
            <h1 className="auth-form-block__title">Создать аккаунт</h1>
          )}
          <div className="auth-form-block__inputs">
            <Input
              value={login}
              setValue={setLogin}
              id="login"
              label="E-mail"
              helperText="Email неправильно введен."
              isValidated={login_correct}
              placeholder="введите email"
              className="auth-form-block__input"
            />
            <Input
              value={pass}
              setValue={setPass}
              id="pass"
              label="Пароль"
              helperText="Пароль не удовлетворяет требованиям"
              isValidated={pass_correct}
              placeholder="введите пароль"
              type="password"
              className="auth-form-block__input"
            />
            {isMobile ? (
              <div className="auth-form-block__select-card-block">
                <p>Способ вывода денег</p>
                <div className="auth-form-block__select-card-wrapper">
                  <SelectCard isMobile={isMobile} />
                </div>
              </div>
            ) : (
              <></>
            )}
            <Input
              value={passAlso}
              setValue={setPassAlso}
              id="passAlso"
              type="password"
              label="Подверждение пароля"
              helperText={"Пароли не совпадают"}
              isValidated={passAlso_correct}
              placeholder="введите пароль"
              className="auth-form-block__input"
            />
          </div>
          <div className="auth-form-block__policy">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            Регистрируясь, я принимаю <br />
            <div className="">
              <a target="_blank" href="/static/assets/docs/policy.pdf">
                Политику конфиденциальности
              </a>{" "}
              и{" "}
              <a target="_blank" href="/static/assets/docs/ofer.pdf">
                Договор Оферты
              </a>
            </div>
          </div>
          <div
            className="auth-form-block__reg-btn"
            style={checked ? {} : { opacity: "0.4" }}
            onClick={checked ? fetchData : () => {}}
          >
            <p>Зарегистрироваться</p>
            <img className="auth-form-block__reg-btn-ic" src={f_arr} />
          </div>
          <div className="auth-form-block__soc-login">
            <p>Или войдите с помощью</p>
            <div className="auth-form-block__soc-icon">
              <a href="#">
                <img src={face} onClick={face_auth} />
              </a>
              <a href="#">
                <img src={vk} onClick={vk_auth} />
              </a>
              {/* <a href="#">
                <img src={inst} />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
