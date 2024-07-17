// components/QrCodeGenerator.js
import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
import { toPng } from "html-to-image";

const QrCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef();

  const handleGenerate = (e) => {
    e.preventDefault();
    setUrl(e.target.elements.urlInput.value);
  };

  const handleDownload = () => {
    if (qrRef.current) {
      toPng(qrRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "qr-code.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.error("Error generating QR code image", err);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleGenerate}>
        <input type="text" name="urlInput" placeholder="Enter URL" />
        <button type="submit">Generate QR Code</button>
      </form>
      {url && (
        <div>
          <div ref={qrRef} style={{ marginTop: "20px" }}>
            <QRCode value={url} />
          </div>
          <button onClick={handleDownload} style={{ marginTop: "20px" }}>
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator;
