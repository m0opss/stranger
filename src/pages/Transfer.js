import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../actions/userActions";
import Header from "../components/Header/Header";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import DonateBlock from "../components/LK/LKContent/LKDonate/LKDonateBlock";

import "./transfer.scss";

const Transfer = ({}) => {
  const [sum, setSum] = useState("");
  const [card, setCard] = useState();
  const [cardNum, setCardNum] = useState("");
  const token = useSelector((state) => state.auth.token);
  const balance = useSelector((state) => state.user.balance);
  const max = balance;
  const type_c = useSelector((state) => state.auth.withdrawal_type);
  console.log(123123, type_c);

  useEffect(() => {
    setCard(type_c);
  }, [type_c]);

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

  const fetchMoney = (_type) => {
    let ok_card;
    if (_type == 5) {
      fetch("https://stranger-go.com/api/v1/users/me/", {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          withdrawal_type: card == "qiwi" ? 1 : card == "phone" ? 2 : 3,
          withdrawal_value: "7" + cardNum,
        }),
      })
        .then((res) => {
          ok_card = res.ok;
          return res.json();
        })
        .then((re) => {
          if (ok_card) {
            let status, ok;
            fetch("https://stranger-go.com/api/v1/users/get_money/", {
              method: "POST",
              headers: {
                Authorization: `Token ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                sum: parseFloat(sum),
              }),
            }).then((res) => {
              status = res.status;
              if (status == 204) {
                handleClick("Деньги успешно переведены", "success");
                dispatch(getUserData(token));
              } else {
                res
                  .json()
                  .then((err) => {
                    if (Object.keys(err).length > 0) {
                      handleClick(
                        err[Object.keys(err)[0]],
                        // "Ошибка при переводе денег. Попробуйте позже",
                        "error"
                      );
                    } else {
                      handleClick("Ошибка при переводе денег. ", "error");
                    }
                  })
                  .catch(() => {
                    console.log(123123);
                    handleClick(
                      "Ошибка при переводе денег. Попробуйте позже",
                      "error"
                    );
                  });
              }
            });
          } else {
            handleClick(re.detail, "error");
          }
        });
    } else {
      let status, ok;
      fetch("https://stranger-go.com/api/v1/users/get_money/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sum: parseFloat(sum),
        }),
      }).then((res) => {
        status = res.status;
        if (status == 204) {
          dispatch(getUserData(token));
          handleClick("Деньги успешно переведены", "success");
        } else {
          res
            .json()
            .then((err) => {
              console.log(123123);
              handleClick(
                err[Object.keys(err)[0]],
                // "Ошибка при переводе денег. Попробуйте позже",
                "error"
              );
            })
            .catch(() => {
              console.log(123123);
              handleClick(
                "Ошибка при переводе денег. Попробуйте позже",
                "error"
              );
            });
        }
      });
    }
  };
  return (
    <div className="transfer-page">
      <Header />
      <div className="lk-content">
        <DonateBlock
          max={max}
          card={card}
          setCard={setCard}
          sum={sum}
          setSum={setSum}
          cardNum={cardNum}
          setCardNum={setCardNum}
          fetchMoney={fetchMoney}
        />
      </div>
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
    </div>
  );
};

export default Transfer;
