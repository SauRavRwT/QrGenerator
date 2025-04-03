import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FiDownload } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });
  const qrRef = useRef();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const downloadQRCode = (e) => {
    e.preventDefault();
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? <BsMoon /> : <BsSun />}
        </button>
        <h1 className="title">QR Code Generator</h1>
        <div className="input-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to generate QR code"
            className="qr-input"
          />
        </div>
        {text && (
          <div ref={qrRef} className="qr-container">
            <QRCodeCanvas
              value={text}
              size={256}
              level="H"
              includeMargin={true}
            />
            <button onClick={downloadQRCode} className="download-button">
              Download QR <FiDownload className="download-icon" />
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
