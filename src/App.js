import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import mergeImages from "merge-images";
import "./App.css";
import styles from "./styles.module.css";
import Controls from "./components/Controls/Controls";
// import SingleUpload from "./components/SingleUpload/SingleUpload";

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

function App() {
  const sigPad = useRef({});
  const [signatureDataURL, setSignatureDataURL] = useState(0);
  const [imageDataURL, setImageDataURL] = useState(0);
  const [outputImageURL, setOutputImageURL] = useState(0);
  const [showUploadBtn, setShowUploadBtn] = useState(false);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const updateCanvasURL = () => {
    setSignatureDataURL(
      sigPad.current.getTrimmedCanvas().toDataURL("image/png")
    );

    if (!imageDataURL) {
      setShowUploadBtn(true);
    }
  };

  const mergeSignatureAndImage = () => {
    mergeImages(
      [
        { src: imageDataURL, x: 0, y: 0 },
        { src: signatureDataURL, x: x, y: y },
      ],
      {
        height: 500,
        width: 500,
      }
    )
      .then((b64) => {
        setOutputImageURL(b64);
      })
      .catch((error) => console.log(error));
  };

  const clearSignaturePad = () => {
    sigPad.current.clear();
    setSignatureDataURL("");
    setImageDataURL("");
    setOutputImageURL("");
    showUploadBtn(false);
  };

  const onFileUpload = (file) => {
    if (!file) {
      setImageDataURL("");
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      setImageDataURL(dataUri);
    });

    setShowUploadBtn(false);
  };

  const handleXY = (event) => {
    if (event.target.id === "x") setX(event.target.value);
    if (event.target.id === "y") setY(event.target.value);
  };

  return (
    <div>
      <div className={styles.main_container}>
        <div className={styles.sigContainer}>
          <SignaturePad
            canvasProps={{ className: styles.sigPad }}
            ref={sigPad}
            onEnd={updateCanvasURL}
          />
        </div>
        <Controls
          onClearSig={clearSignaturePad}
          signatureDataURL={signatureDataURL}
          imageDataURL={imageDataURL}
          handleXY={handleXY}
        ></Controls>

        <div className="row">
          <div className="col">
            {signatureDataURL ? (
              <img
                className={styles.sigImage}
                src={signatureDataURL}
                alt={"pdf-sig"}
              />
            ) : null}
          </div>

          <div className="col">
            {imageDataURL ? (
              <img width="500" height="500" src={imageDataURL} alt="avatar" />
            ) : null}
          </div>

          <div className="col">
            {showUploadBtn ? (
              <input
                type="file"
                onChange={(event) =>
                  onFileUpload(event.target.files[0] || null)
                }
              />
            ) : null}
          </div>

          <div className="col">
            {signatureDataURL && imageDataURL ? (
              <button
                className={styles.buttons}
                onClick={mergeSignatureAndImage}
              >
                Merge
              </button>
            ) : null}
          </div>

          <div className="col">
            {outputImageURL ? (
              <img width="275" height="275" src={outputImageURL} alt="avatar" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
