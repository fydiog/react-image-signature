import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import mergeImages from "merge-images";
import Controls from "./components/Controls/Controls";
import "./App.css";

import {
  INFO_MESSAGE_DRAW,
  INFO_MESSAGE_UPLOAD,
  INFO_MESSAGE_MERGE,
} from "./constants/infoConstants";

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
  const finalResult = useRef(null);
  const [signatureDataURL, setSignatureDataURL] = useState(0);
  const [imageDataURL, setImageDataURL] = useState(0);
  const [outputImageURL, setOutputImageURL] = useState(0);
  const [showUploadBtn, setShowUploadBtn] = useState(false);
  const [info, setInfo] = useState(null);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const updateCanvasURL = () => {
    setSignatureDataURL(
      sigPad.current.getTrimmedCanvas().toDataURL("image/png")
    );

    if (!imageDataURL) {
      setShowUploadBtn(true);
    }
    handleInfo(INFO_MESSAGE_UPLOAD);
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
        scrollToImage();
      })
      .catch((error) => console.log(error));
  };

  const clearSignaturePad = () => {
    sigPad.current.clear();
    setSignatureDataURL("");
    setImageDataURL("");
    setOutputImageURL("");
    setShowUploadBtn(false);
    handleInfo(INFO_MESSAGE_DRAW);
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
    handleInfo(INFO_MESSAGE_MERGE);
  };

  const handleInfo = (string) => {
    switch (string) {
      case INFO_MESSAGE_DRAW:
        setInfo(INFO_MESSAGE_DRAW);
        break;
      case INFO_MESSAGE_UPLOAD:
        setInfo(INFO_MESSAGE_UPLOAD);
        break;
      case INFO_MESSAGE_MERGE:
        setInfo(INFO_MESSAGE_MERGE);
        break;

      default:
        break;
    }
  };

  const handleXY = (event) => {
    if (event.target.id === "x") setX(event.target.value);
    if (event.target.id === "y") setY(event.target.value);
  };

  const scrollToImage = () => {
    finalResult.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="main_container">
        <SignaturePad
          canvasProps={{ className: "sigPad" }}
          ref={sigPad}
          onEnd={updateCanvasURL}
        />

        <Controls
          onClearSig={clearSignaturePad}
          signatureDataURL={signatureDataURL}
          imageDataURL={imageDataURL}
          handleXY={handleXY}
          mergeSignatureAndImage={mergeSignatureAndImage}
          info={info}
          handleInfo={handleInfo}
        ></Controls>

        <section className="results">
          {/* SIGNATURE IMAGE */}
          {signatureDataURL ? (
            <img className="sigImage" src={signatureDataURL} alt={"pdf-sig"} />
          ) : null}

          {/* MERGE BUTTON */}
          {signatureDataURL && imageDataURL ? (
            <button
              className="control_btn merge"
              onClick={mergeSignatureAndImage}
            >
              Merge images
            </button>
          ) : null}

          {imageDataURL ? (
            <img className="sigImage" src={imageDataURL} alt="avatar" />
          ) : null}

          {/* FILE UPLOAD */}

          {showUploadBtn ? (
            <div className="file-upload-wrapper">
              <div className="file-upload">
                <input
                  type="file"
                  onChange={(event) =>
                    onFileUpload(event.target.files[0] || null)
                  }
                />
                <i className="fa fa-arrow-up"></i>
              </div>
            </div>
          ) : null}

          {/* FINAL IMAGE */}
          {outputImageURL ? (
            <div>
              <img width="500" height="500" src={outputImageURL} alt="avatar" />
              <div ref={finalResult}></div>
            </div>
          ) : null}
        </section>
      </div>
    </>
  );
}

export default App;
