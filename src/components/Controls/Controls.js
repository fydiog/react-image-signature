import React from "react";
import "../../App";
import {
  INFO_MESSAGE_DRAW,
  INFO_MESSAGE_UPLOAD,
  INFO_MESSAGE_MERGE,
} from "../../constants/infoConstants";

const Controls = ({
  signatureDataURL,
  onClearSig,
  handleXY,
  info,
  handleInfo,
}) => {
  return (
    <div className="controls">
      <button className="control_btn sigpad" onClick={onClearSig}>
        Clear
        <i className="fa-regular fa-circle-xmark"></i>
      </button>

      <button
        className="control_btn sigpad"
        onClick={() => console.log(signatureDataURL)}
      >
        Show URL (console)
      </button>

      <div>
        <label htmlFor="x">
          <i className="fa-solid fa-x"></i>
        </label>
        <input type="text" id="x" onChange={handleXY} />
        <label htmlFor="y">
          <i className="fa-solid fa-y"></i>
        </label>
        <input type="text" id="y" onChange={handleXY} />
      </div>

      <div className="info">
        <p>
          {" "}
          {info === null ? handleInfo(INFO_MESSAGE_DRAW) : null}
          <i class="fa-solid fa-circle-info"></i>
          {info && info}
        </p>
      </div>
    </div>
  );
};

export default Controls;
