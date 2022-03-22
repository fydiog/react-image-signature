import React from "react";
import styles from "../../App";

const Controls = ({ signatureDataURL, onClearSig, handleXY }) => {
  return (
    <>
      <div>
        <button className={styles.buttons} onClick={onClearSig}>
          Clear
        </button>

        <button
          className={styles.buttons}
          onClick={() => console.log(signatureDataURL)}
        >
          Show URL (console)
        </button>

        <label htmlFor="x">X:</label>
        <input type="text" id="x" onChange={handleXY} />
        <label htmlFor="y">Y:</label>
        <input type="text" id="y" onChange={handleXY} />
      </div>
    </>
  );
};

export default Controls;
