import React from "react";
import "../../components/FirstPage/first.css";
import regh from "../../assets/img/100.png";
import str from "../../assets/img/Strel.png";
import Done from "../../assets/img/Done.png";
import Add from "../../assets/img/Add.png";
import { useNavigate } from "react-router-dom";

const First = () => {
  const navigate = useNavigate();

  return (
    <div className="section4">
      <div className="pick">
        <div className="pickhead">
          What is&nbsp;<div className="MyCloud">MY CLOUD</div>
        </div>
        <div className="weknow">
          A personal cloud for your data, where your files are securely
          protected. Save important documents and memories in our storage
          facility.
        </div>
        <div className="howit">How to work with this?</div>
        <div className="HOWITE">
          <div className="card">
            <img src={regh} alt="register" id="reg" className="reg" />
          </div>
          <div className="cardtext">
            At first you need to register at MyCloud! Then log in!
          </div>
          <div className="vector">
            <img src={str} alt="arrow" className="strel" />
          </div>

          <div className="tree">
            <img src={Add} alt="add files" className="add" />
          </div>
          <div className="zootext">
            In the next step you can add your files, then manage them in your
            storage!
          </div>
          <div className="vector2">
            <img src={str} alt="arrow" className="strel" />
          </div>

          <div className="monkey">
            <img src={Done} alt="done" className="done" />
          </div>
          <div className="montext">Done, enjoy using it!</div>
        </div>

        <button className="btn3" onClick={() => navigate("/login")}>
          <div className="btn3t">Get into your cloud!</div>
        </button>
        <button className="btn4" onClick={() => navigate("/registration")}>
          <div className="btn3t">Register now!</div>
        </button>
      </div>
    </div>
  );
};

export default First;
