import React, { useEffect, useState } from "react";

import icon_log from "../../../../assets/img/LK/inputIconLog.svg";
import icon_pass from "../../../../assets/img/LK/inputIconPass.svg";

import "./lksettings.scss";

const SettingsBlockInput = ({ icon, value, setValue, placeholder, type }) => {
  return (
    <div className="custom-input">
      <img src={icon} />
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

const ChangePassBlock = ({ setActiveblock }) => {
  const [disable, setDisable] = useState(true);
  const [log, set_log] = useState("");
  const [old_pass, set_old_pass] = useState("");
  const [new_pass, set_new_pass] = useState("");
  const [also_pass, set_also_pass] = useState("");

  useEffect(() => {
    if (log != "" && old_pass != "" && new_pass != "" && also_pass != "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [log, old_pass, new_pass, also_pass]);
  return (
    <>
      <div className="settings-block__change change-pass-block">
        <div
          className="settings-block__close-btn"
          onClick={() => setActiveblock("")}
        >
          <span></span>
        </div>
        <div className="settings-block__inputs">
          <SettingsBlockInput
            icon={icon_log}
            value={log}
            setValue={set_log}
            placeholder="логин"
            type="text"
          />
          <SettingsBlockInput
            icon={icon_pass}
            value={old_pass}
            setValue={set_old_pass}
            placeholder="старый пароль"
            type="password"
          />
          <SettingsBlockInput
            icon={icon_pass}
            value={new_pass}
            setValue={set_new_pass}
            placeholder="новый пароль"
            type="password"
          />
          <SettingsBlockInput
            icon={icon_pass}
            value={also_pass}
            setValue={set_also_pass}
            placeholder="подвердите новый пароль"
            type="password"
          />
        </div>
      </div>
      <div
        className={`save-settings-btn btn lk-btn ${
          disable ? "lk-btn__disable" : ""
        }`}
      >
        изменить
      </div>
    </>
  );
};
const ChangeLogBlock = ({ setActiveblock }) => {
  const [disable, setDisable] = useState(true);
  const [old_log, set_old_log] = useState("");
  const [new_log, set_new_log] = useState("");

  const [pass, set_pass] = useState("");

  useEffect(() => {
    if (old_log != "" && new_log != "" && pass != "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [old_log, new_log, pass]);

  return (
    <>
      <div className="settings-block__change change-log-block">
        <div
          className="settings-block__close-btn"
          onClick={() => setActiveblock("")}
        >
          <span></span>
        </div>
        <div className="settings-block__inputs">
          <SettingsBlockInput
            icon={icon_log}
            value={old_log}
            setValue={set_old_log}
            placeholder="старый логин"
            type="text"
          />
          <SettingsBlockInput
            icon={icon_log}
            value={new_log}
            setValue={set_new_log}
            placeholder="новый логин"
            type="text"
          />
          <SettingsBlockInput
            icon={icon_pass}
            value={pass}
            setValue={set_pass}
            placeholder="пароль"
            type="password"
          />
        </div>
      </div>
      <div
        className={`save-settings-btn btn lk-btn ${
          disable ? "lk-btn__disable" : ""
        }`}
      >
        изменить
      </div>
    </>
  );
};

const ButtonsBlock = ({ setActiveblock, isAdmin }) => {
  return (
    <div className="settings-block__change buttons-block">
      <div
        className="buttons-block__button btn lk-btn lk-btn "
        onClick={() => setActiveblock("log")}
      >
        изменить логин
      </div>
      <div
        className="buttons-block__button btn lk-btn lk-btn"
        onClick={() => setActiveblock("pass")}
      >
        изменить пароль
      </div>
      {isAdmin ? (
        <div
          className="buttons-block__button btn lk-btn lk-btn"
          onClick={() => setActiveblock("addUser")}
        >
          добавить пользователя
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const SettingsBlock = ({ setActiveTab, isAdmin, isMobile }) => {
  const [activeBlock, setActiveblock] = useState("");

  return (
    <div className="lk-content__block settings-block">
      <div className="settings-block__mobile-wrapper">
        {activeBlock == "pass" ? (
          <>
            <p className="settings-block__title">Настройки аккаунта</p>
            <p className="settings-block__descr">
              Здесь вы можете изменить свой пароль в игре
            </p>
            <ChangePassBlock setActiveblock={setActiveblock} />
          </>
        ) : activeBlock == "log" ? (
          <>
            <p className="settings-block__title">Настройки аккаунта</p>
            <p className="settings-block__descr">
              Здесь вы можете изменить свой логин в игре
            </p>
            <ChangeLogBlock setActiveblock={setActiveblock} />
          </>
        ) : activeBlock == "addUser" ? (
          <>
            <p
              className="settings-block__title"
              style={{ marginBottom: "30px" }}
            >
              Добавить пользователя
            </p>
            <div className="settings-block__user-type">
              <label className="rad-label">
                <input type="radio" class="rad-input" name="rad" />
                <div className="rad-design"></div>
                <div className="rad-text">Обычный</div>
              </label>

              <label className="rad-label">
                <input type="radio" class="rad-input" name="rad" />
                <div className="rad-design"></div>
                <div className="rad-text">Администратор</div>
              </label>
            </div>
            <ChangeLogBlock setActiveblock={setActiveblock} />
          </>
        ) : (
          <>
            <p className="settings-block__title">Настройки аккаунта</p>
            {!isMobile ? (
              <></>
            ) : (
              <div
                className="settings-block__close-btn"
                onClick={() => setActiveTab("")}
              >
                <span></span>
              </div>
            )}
            <ButtonsBlock setActiveblock={setActiveblock} isAdmin={isAdmin} />
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsBlock;
