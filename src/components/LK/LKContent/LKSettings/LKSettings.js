import React, { useState } from "react";

import icon_log from "../../../../assets/img/LK/inputIconLog.svg";
import icon_pass from "../../../../assets/img/LK/inputIconPass.svg";

import "./lksettings.scss";

const SettingsBlockInput = ({ icon, value, setValue, placeholder }) => {
  return (
    <div className="custom-input">
      <img src={icon} />
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

const ChangePassBlock = ({ setActiveblock }) => {
  return (
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
          value=""
          setValue=""
          placeholder="логин"
        />
        <SettingsBlockInput
          icon={icon_pass}
          value=""
          setValue=""
          placeholder="старый пароль"
        />
        <SettingsBlockInput
          icon={icon_pass}
          value=""
          setValue=""
          placeholder="новый пароль"
        />
        <SettingsBlockInput
          icon={icon_pass}
          value=""
          setValue=""
          placeholder="подвердите новый пароль"
        />
      </div>
    </div>
  );
};
const ChangeLogBlock = ({ setActiveblock }) => {
  return (
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
          value=""
          setValue=""
          placeholder="старый логин"
        />
        <SettingsBlockInput
          icon={icon_log}
          value=""
          setValue=""
          placeholder="новый логин"
        />
        <SettingsBlockInput
          icon={icon_pass}
          value=""
          setValue=""
          placeholder="пароль"
        />
      </div>
    </div>
  );
};

const ButtonsBlock = ({ setActiveblock }) => {
  return (
    <div className="settings-block__change buttons-block">
      <div
        className="buttons-block__button btn lk-btn"
        onClick={() => setActiveblock("log")}
      >
        изменить логин
      </div>
      <div
        className="buttons-block__button btn lk-btn"
        onClick={() => setActiveblock("pass")}
      >
        изменить пароль
      </div>
    </div>
  );
};

const SettingsBlock = ({}) => {
  const [activeBlock, setActiveblock] = useState("");

  return (
    <div className="lk-content__block settings-block">
      {activeBlock == "pass" ? (
        <>
          <p className="settings-block__title settings-block__title_small">
            Настройки аккаунта
          </p>
          <p className="settings-block__descr">
            Здесь вы можете изменить свой пароль в игре
          </p>
          <ChangePassBlock setActiveblock={setActiveblock} />
          <div className="save-settings-btn btn lk-btn">изменить</div>
        </>
      ) : activeBlock == "log" ? (
        <>
          <p className="settings-block__title settings-block__title_small">
            Настройки аккаунта
          </p>
          <p className="settings-block__descr">
            Здесь вы можете изменить свой логин в игре
          </p>
          <ChangeLogBlock setActiveblock={setActiveblock} />
          <div className="save-settings-btn btn lk-btn">изменить</div>
        </>
      ) : (
        <>
          <p className="settings-block__title">Настройки аккаунта</p>
          <ButtonsBlock setActiveblock={setActiveblock} />
        </>
      )}
    </div>
  );
};

export default SettingsBlock;
