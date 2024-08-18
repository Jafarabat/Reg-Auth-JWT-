import React from "react";
import "./Error.css";
import errorPicture from "../../images/ded.jpg";

const Error = () => {
  return (
    <div className="error">
      <div className="main-error">
        <img className="error-picture" src={errorPicture} alt="" />
        Вы кто такие? Я вас не звал! Идите на 404 Not Found!
      </div>
    </div>
  );
};

export default Error;
