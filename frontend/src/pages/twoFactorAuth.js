import axios from "axios";
// pages/twoFactorAuth.js
import { useState } from "react";

const TwoFactorAuth = ({setSecret}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQrCode = async () => {
    const email = "david.12dev4@gmail.com"; // Replace with user email
    const { data } = await axios.post(
      "http://localhost:5000/2fa/generate/",
      { email }
    );
    console.log(data)
    setQrCodeUrl(data.qrCode);
    setSecret(data.secret)
  };

  return (
    <div>
      <h2>Enable Two-Factor Authentication</h2>
      <button onClick={generateQrCode}>Generate QR Code</button>
      {qrCodeUrl && (
        <div>
          <img src={qrCodeUrl} alt="QR Code" />
          <p>Scan the QR code with Google Authenticator</p>
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuth;
