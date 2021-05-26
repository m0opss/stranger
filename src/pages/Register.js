import React, { useState } from "react";
import Header from "../components/Header/Header";
import TextField from "@material-ui/core/TextField";
import Input from "../components/AuthInput/Input";

import "./register.scss";


const Register = ({}) => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="page-auth register">
      <div className="page-auth__background page-auth__background_1"></div>
      <div className="page-auth__background page-auth__background_2"></div>
      <Header />
      <div className="page-auth__content">
        <div className="page-auth__alien-block"></div>
        <div className="page-auth__form-block  auth-form-block  auth-form-block_reg">
          <h1 className="auth-form-block__title">Создать аккаунт</h1>
          <div className="auth-form-block">
            <Input
              value={login}
              setValue={setLogin}
              id="login"
              label="E-mail"
              helperText="Email неправильно введен."
              isValidated={true}
              placeholder="введите email"
              className='auth-form-block__input'
            />
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};
export default Register;
