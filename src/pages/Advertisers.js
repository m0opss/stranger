import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import Container from "../components/Containers/Container";
import Input from "../components/AuthInput/Input";
import alien from "../assets/img/alien.png";

import "./advertisers.scss";
import MainFooter from "../components/MainFooter/MainFooter";

const Advertisers = () => {
  const [visible, setVisible] = React.useState(false);
  const [modalVal, setModalVal] = React.useState("");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="page advertisers-page">
      <Modal
        title="Заявка"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Отправить'
        cancelText='Отмена'
      >
        <p>
          Для того, чтобы связаться с нами, оставьте вашу заявку с номером
          телефона или email для дальнейшнего сотрудничества.
        </p>
        <Input
          value={modalVal}
          setValue={setModalVal}
          id={'1'}
          label=""
          placeholder="Телефон или Email"
          isValidated={true}
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
          <div className="btn main-block__btn" onClick={showModal}>
            ОТПРАВИТЬ
          </div>
        </div>

        <MainFooter />
      </Container>
    </div>
  );
};

export default Advertisers;
