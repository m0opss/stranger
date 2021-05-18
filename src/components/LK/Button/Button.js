import React, { useEffect, useState } from "react";
import "./button.scss";

const LKButton = ({ img }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    console.log(active);
  }, [active]);

  return (
    <div
      className={`lk-button ${active ? "active" : ""}`}
      onClick={() => setActive((active) => !active)}
    >
      <img className="" src={img} />
    </div>
  );
};

export default LKButton;
