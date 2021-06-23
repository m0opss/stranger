import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import Container from "../components/Containers/Container";
import Input from "../components/AuthInput/Input";
import alien from "../assets/img/alien.png";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./advertisers.scss";
import MainFooter from "../components/MainFooter/MainFooter";

const Advertisers = () => {
  const [visibleM, setVisibleM] = React.useState(false);
  const [modalVal, setModalVal] = React.useState("");
  const [modalValid, setModalValid] = React.useState(true);

  const showModalM = () => {
    setVisibleM(true);
  };

  const handleOk = () => {
    if (modalVal == "") {
      setModalValid(false);
    } else {
      setModalValid(true);
      setVisibleM(false);
      (async () => {
        const rawResponse = await fetch(
          "https://stranger-go.com/api/v1/adversiters/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contact_data: modalVal,
            }),
          }
        );
        if (rawResponse.ok) {
          handleClick("Заявка успешно отправлена!", "success");
        } else {
          const err = await rawResponse.json();
          handleClick(err[Object.keys(err)[0]], "error");
        }
      })();
    }
  };
  const handleCancel = () => {
    setVisibleM(false);
  };
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
  ///////////////////////////////////////////

  return (
    <div className="page advertisers-page">
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
      <Modal
        title="Заявка"
        visible={visibleM}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Отправить"
        cancelText="Отмена"
      >
        <p>
          Для того, чтобы связаться с нами, оставьте вашу заявку с номером
          телефона или email для дальнейшнего сотрудничества.
        </p>
        <Input
          value={modalVal}
          setValue={setModalVal}
          id={"1"}
          label=""
          placeholder="Телефон или Email"
          isValidated={modalValid}
          helperText={"Проверьте правильность данных"}
          className="modal-input"
        />
      </Modal>
      <Container type="dark">
        <div className="main-block">
          <p>РЕКЛАМОДАТЕЛЯМ</p>
          <p className="main-block__feedback">
            Для того, чтобы связаться с нами, оставьте вашу заявку с номером
            телефона или email для дальнейшнего сотрудничества.
          </p>
          <div className="main-block__img-container">
            <img src={alien} />
          </div>
          <div className="btn main-block__btn" onClick={showModalM}>
            ОТПРАВИТЬ
          </div>
        </div>

        <MainFooter />
      </Container>
    </div>
  );
};

export default Advertisers;
