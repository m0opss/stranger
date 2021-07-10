import React, { useState } from "react";
import Header from "../components/Header/Header";
import Input from "../components/AuthInput/Input";
import { Link, useHistory } from "react-router-dom";

import f_arr from "../assets/img/forwardArr.svg";

import alien_m from "../assets/img/alien.svg";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import "./register.scss";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { getTokenAnon } from "../actions/authActions";

const ResetPassConfirm = ({}) => {
  const [pass, setPass] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  const token = localStorage.getItem("token");
  const uid = useSelector((state) => state.auth.uid);
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
    (async () => {
      const rawResponse = await fetch(
        "https://stranger-go.com/api/v1/users/reset_password_confirm/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: uid,
            token: token,
            new_password: pass,
          }),
        }
      );
      if (rawResponse.ok) {
        handleClick(`Пароль успешно изменен!`, "success");
        dispatch(getTokenAnon());
        localStorage.removeItem("token");
        console.log("reseted!");
        history.push("/");
      } else {
        const err = await rawResponse.json();
        handleClick(err[Object.keys(err)[0]], "error");
      }
    })();
  };

  return (
    <div className="page-auth login">
      {/* <div className="page-auth__background page-auth__background_1"></div>
      <div className="page-auth__background page-auth__background_2"></div>
      <div className="page-auth__background page-auth__background_2_m"></div> */}
      <div className="page-auth__background page-auth__background_3"></div>
      {/* <div className="page-auth__background page-auth__background_4"></div> */}
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
          <p className="page-auth__alien-row_2">ДОБРО ПОЖАЛОВАТЬ</p>
          <p className="page-auth__alien-row_3">
            Войди за пару секунд и забери зароботанные деньги без ввода
            конфиденциальных данных.
          </p>
        </div>
        <div className="page-auth__form-block  auth-form-block">
          <h1 className="auth-form-block__title">Восстановление пароля</h1>

          <div className="auth-form-block__inputs">
            <Input
              value={pass}
              setValue={setPass}
              id="pass"
              label="Пароль"
              helperText="Пароль не удовлетворяет требованиям"
              isValidated={true}
              placeholder="введите пароль"
              type="password"
              className="auth-form-block__input"
            />
            <Input
              value={pass}
              setValue={setPass}
              id="pass"
              label="Повторите пароль"
              helperText="Пароли не совпадают"
              isValidated={true}
              placeholder="введите пароль еще раз"
              type="password"
              className="auth-form-block__input"
            />
          </div>
          <div className="auth-form-block__reg-btn" onClick={fetchData}>
            <p>Отправить</p>
            <img className="auth-form-block__reg-btn-ic" src={f_arr} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPassConfirm;
