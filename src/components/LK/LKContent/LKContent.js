import React, { useEffect, useState } from "react";

import "./lkcontent.scss";
import HistoryBlock from "./LKHistory/LKHistory";
import WatchBlock from "./LKWatch/LKWatch";
import DonateBlock from "./LKDonate/LKDonateBlock";
import SettingsBlock from "./LKSettings/LKSettings";
import { useSelector } from "react-redux";

const LKContentUser = ({
  activeTab,
  setActiveTab,
  isMobile,
  setCard,
  card,
}) => {
  const [sum, setSum] = useState("");
  const max = 3000;
  const token = useSelector((state) => state.auth.token);
  let status, ok;
  const fetchMoney = () => {
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
    })
      .then((res) => {
        status = res.status;
        ok = res.ok;
        return res.json();
      })
      .then((re) => {
        console.log(re)
        if (ok) {
          alert(re.detail);
        } else {
          alert(re.detail);
        }
      });
  };
  return (
    <>
      {isMobile ? (
        <>
          <HistoryBlock type="mobile" />
          {activeTab != "set" ? (
            <></>
          ) : (
            <div className="lk-content">
              <SettingsBlock setActiveTab={setActiveTab} isMobile={isMobile} />
            </div>
          )}
        </>
      ) : (
        <div className="lk-content">
          {activeTab == "arr" ? (
            <DonateBlock
              setCard={setCard}
              card={card}
              sum={sum}
              max={max}
              setSum={setSum}
              fetchMoney={fetchMoney}
            />
          ) : activeTab == "history" ? (
            <HistoryBlock />
          ) : activeTab == "set" ? (
            <SettingsBlock setActiveTab={setActiveTab} isMobile={isMobile} />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
const LKContentAdmin = ({ activeTab, setActiveTab, isMobile }) => {
  const token = useSelector((state) => state.auth.token);

  const [users, setUsers] = useState([]);
  const [dataS, setDataS] = useState([]);
  const [dataH, setDataH] = useState([]);
  useEffect(() => {
    fetch("https://stranger-go.com/api/v1/users/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((re) => {
        let data = [...re];
        data.sort((a, b) => (a.id > b.id ? 1 : -1));
        setUsers(data);
      });
    fetch("https://stranger-go.com/api/v1/users/post_statistics/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((re) => {
        setDataS(data);
      });
    fetch("https://stranger-go.com/api/v1/users/post_transaction/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((re) => {
        let data = [...re];
        data.sort((a, b) => (a.id > b.id ? 1 : -1));
        setDataH(data);
      });
  }, []);

  const loadCsv = (type) => {
    const formData = new FormData();
    formData.append("download", 1);
    fetch(`https://stranger-go.com/api/v1/users/${type}/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,

        // "Content-Type": "text/html; charset=utf-8",
      },
      body: formData,
    })
      .then((re) => re.text())
      .then((re) => {
        console.log(re);
        var dataStr =
          "data:attachment/csv;charset=utf-8," + encodeURIComponent(re);
        var downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "stat.csv");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      });
  };

  const blockUser = (id) => {
    fetch("https://stranger-go.com/api/v1/users/set_block_user/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: id,
      }),
    }).then((re) => {
      if (re.ok)
        fetch("https://stranger-go.com/api/v1/users/", {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((re) => {
            let data = [...re];
            data.sort((a, b) => (a.id > b.id ? 1 : -1));
            setUsers(data);
          });
    });
  };

  return (
    <>
      {isMobile ? (
        <>
          {activeTab == "watch-m" ? (
            <WatchBlock
              type="watch"
              data={dataS}
              loadCsv={() => loadCsv("post_statistics")}
            />
          ) : activeTab == "history-m" ? (
            <WatchBlock
              type="history"
              data={dataH}
              loadCsv={() => loadCsv("post_transaction")}
            />
          ) : activeTab == "set" ? (
            <SettingsBlock
              setActiveTab={setActiveTab}
              isMobile={isMobile}
              isAdmin={true}
            />
          ) : activeTab == "users-m" ? (
            <WatchBlock
              type="users"
              data={users}
              loadCsv={loadCsv}
              blockUser={blockUser}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <div className="lk-content">
          {activeTab == "watch" ? (
            <WatchBlock
              type="watch"
              data={dataS}
              loadCsv={() => loadCsv("post_statistics")}
            />
          ) : activeTab == "history" ? (
            <WatchBlock
              type="history"
              data={dataH}
              loadCsv={() => loadCsv("post_transaction")}
            />
          ) : activeTab == "users" ? (
            <WatchBlock
              type="users"
              data={users}
              loadCsv={loadCsv}
              blockUser={blockUser}
            />
          ) : activeTab == "set" ? (
            <SettingsBlock
              setActiveTab={setActiveTab}
              isMobile={isMobile}
              isAdmin={true}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

const LKContent = ({ activeTab, setActiveTab, isMobile, isAdmin }) => {
  const [card, setCard] = useState("qiwi");

  return (
    <>
      {isAdmin ? (
        <LKContentAdmin
          isAdmin={isAdmin}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobile={isMobile}
        />
      ) : (
        <LKContentUser
          isAdmin={isAdmin}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobile={isMobile}
          setCard={setCard}
          card={card}
        />
      )}
    </>
  );
};

export default LKContent;
