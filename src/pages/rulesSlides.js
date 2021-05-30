import React, { useState } from "react";

const RulesSlides = ({}) => {
  const [step, setStep] = useState("1");
  return (
    <div className="page rules rules-slides">
      <Container type="dark">
        <div className="main-block">
          <p>{step} ШАГ</p>
          <div className="main-block__img-container">
            
          </div>

        </div>
      </Container>
    </div>
  );
};

export default RulesSlides;
