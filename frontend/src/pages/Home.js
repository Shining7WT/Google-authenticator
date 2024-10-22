import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TwoFactorAuth = () => {
  const [qrCode, setQrCode] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  // Fetch QR code for enabling 2FA
  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.post('http://localhost:5000/2fa/generate', {}, { withCredentials: true });
        // Assuming the response data structure is { qrCode: '...' }
        setQrCode(response.data.qrCode);
      } catch (error) {
        console.error('Error fetching QR code:', error);
        setMessage('Failed to fetch QR code.');
      }
    };

    fetchQRCode();
  }, []);

  // Verify the token entered by the user
  const verifyToken = async () => {
    try {
      const response = await axios.post('http://localhost:5000/2fa/verify', {
        token,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setMessage('2FA enabled successfully');
      } else {
        setMessage('Invalid token, please try again');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setMessage('Error verifying token.');
    }
  };

  return (
    <div>
      <h1>Enable Two-Factor Authentication</h1>
      
      {/* Display the QR code if it's available */}
      {qrCode ? (
        <div>
          <img src={qrCode} alt="Scan QR Code" />
          <p>Scan this QR code with your Google Authenticator app.</p>
        </div>
      ) : (
        <p>Loading QR code...</p>
      )}
      
      {/* Input field for the user to enter their 2FA token */}
      <input
        type="text"
        placeholder="Enter token from Google Authenticator"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={verifyToken}>Verify Token</button>
      <p>{message}</p>
    </div>
  );
};

export default TwoFactorAuth;
