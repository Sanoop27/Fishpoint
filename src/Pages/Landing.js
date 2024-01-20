import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="main_container">
      <div className="cards" onClick={() => handleButtonClick("/market")}>
        Market Boy
      </div>
      <div className="cards" onClick={() => handleButtonClick("/orders")}>
        Place Order
      </div>
      <div className="cards" onClick={() => handleButtonClick("/delivery")}>
        Delivery Boy
      </div>
    </div>
  );
}

export default Landing;
