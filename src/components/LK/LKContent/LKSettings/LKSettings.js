import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

const ChangePassBlock = ({ setActiveblock, token, isAdmin }) => {
  const [disable, setDisable] = useState(true);
  const [old_pass, set_old_pass] = useState("");
  const [new_pass, set_new_pass] = useState("");
  const [also_pass, set_also_pass] = useState("");

  useEffect(() => {
    if (old_pass != "" && new_pass != "" && also_pass != "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [old_pass, new_pass, also_pass]);

  const fetchData = () => {
    (async () => {
      const rawResponse = await fetch(
        "https://stranger-go.com/api/v1/users/set_password/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            new_password: new_pass,
            re_new_password: also_pass,
            current_password: old_pass,
          }),
        }
      );
      if (rawResponse.ok) {
        const content = await rawResponse.json();
        console.log(content);
        alert("Пароль успешно изменен");
      } else {
        const err = await response.json();
        alert("Ошибка HTTP: " + response.status + " " + JSON.stringify(err));
      }
    })();
  };
  return (
    <>
      <div className="settings-block__change change-pass-block">
        {isAdmin ? (
          <div
            className="settings-block__close-btn"
            onClick={() => setActiveblock("")}
          >
            <span></span>
          </div>
        ) : (
          <></>
        )}
        <div className="settings-block__inputs">
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
        onClick={fetchData}
      >
        изменить
      </div>
    </>
  );
};


const AddBlock = ({ setActiveblock, token }) => {
  const [log, set_log] = useState("");
  const [disable, setDisable] = useState(true);
  const [isAddAdmin, setisAddAdmin] = useState(false);
  const [pass, set_pass] = useState("");
  const [code, set_code] = useState("");

  useEffect(() => {
    if (isAddAdmin) {
      if (log != "" && pass != "" && code != "") {
        setDisable(false);
      } else {
        setDisable(true);
      }
    } else {
      if (log != "" && pass != "") {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [log, pass, code, isAddAdmin]);

  const toggleRadioBtn = (type) => {
    if (type == "admin") setisAddAdmin(true);
    else setisAddAdmin(false);
  };
  const fetchData = () => {
    (async () => {
      const rawResponse = await fetch(
        "https://stranger-go.com/api/v1/users/create_user/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            email: log,
            password: pass,
            is_superuser: isAddAdmin,
          }),
        }
      );
      if (rawResponse.ok) {
        const content = await rawResponse.json();
        console.log(content);
        alert("Пользователь добавлен.ID: " + content.id);
      } else {
        const err = await response.json();
        alert("Ошибка HTTP: " + response.status + " " + JSON.stringify(err));
      }
    })();
  };
  return (
    <>
      <div className="settings-block__user-type">
        <label className="rad-label">
          <input
            type="radio"
            className="rad-input"
            name="rad"
            value="user"
            defaultChecked
            onChange={(e) => toggleRadioBtn(e.target.value)}
          />
          <div className="rad-design"></div>
          <div className="rad-text">Обычный</div>
        </label>

        <label className="rad-label">
          <input
            type="radio"
            className="rad-input"
            name="rad"
            value="admin"
            onChange={(e) => toggleRadioBtn(e.target.value)}
          />
          <div className="rad-design"></div>
          <div className="rad-text">Администратор</div>
        </label>
      </div>
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
            value={log}
            setValue={set_log}
            placeholder="email"
            type="text"
          />
          <SettingsBlockInput
            icon={icon_pass}
            value={pass}
            setValue={set_pass}
            placeholder="пароль"
            type="password"
          />
          {isAddAdmin ? (
            <SettingsBlockInput
              icon={icon_pass}
              value={code}
              setValue={set_code}
              placeholder="секретный код"
              type="password"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className={`save-settings-btn btn lk-btn ${
          disable ? "lk-btn__disable" : ""
        }`}
        onClick={fetchData}
      >
        добавить
      </div>
    </>
  );
};

const ButtonsBlock = ({ setActiveblock }) => {
  return (
    <div className="settings-block__change buttons-block">
      <div
        className="buttons-block__button btn lk-btn lk-btn"
        onClick={() => setActiveblock("pass")}
      >
        изменить пароль
      </div>

      <div
        className="buttons-block__button btn lk-btn lk-btn"
        onClick={() => setActiveblock("addUser")}
      >
        добавить пользователя
      </div>
    </div>
  );
};

const SettingsBlock = ({ isAdmin }) => {
  const [activeBlock, setActiveblock] = useState(isAdmin ? "" : "pass");
  const token = useSelector((state) => state.auth.token);
  return (
    <div
      className={`lk-content__block settings-block ${
        isAdmin ? "settings-block_admin" : ""
      }`}
    >
      <div className="settings-block__mobile-wrapper">
        {activeBlock == "pass" ? (
          <>
            <p className="settings-block__title">Настройки аккаунта</p>
            <p className="settings-block__descr">
              Здесь вы можете изменить свой пароль в игре
            </p>
            <ChangePassBlock
              isAdmin={isAdmin}
              token={token}
              setActiveblock={setActiveblock}
            />
          </>
        ) : activeBlock == "addUser" ? (
          <>
            <p
              className="settings-block__title"
              style={{ marginBottom: "30px" }}
            >
              Добавить пользователя
            </p>
            <AddBlock token={token} setActiveblock={setActiveblock} />
          </>
        ) : (
          <>
            <p className="settings-block__title">Настройки аккаунта</p>
            {isAdmin ? (
              <ButtonsBlock setActiveblock={setActiveblock} isAdmin={isAdmin} />
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsBlock;
