import axios from 'axios';
// pages/validateToken.js
import { useState } from 'react';

const ValidateToken = ({ secret }) => {
  const [token, setToken] = useState('');
  const [isValid, setIsValid] = useState(null);

  const validateToken = async () => {
    console.log(secret)
    const { data } = await axios.post('http://localhost:5000/2fa/verify/', { token, secret });
    console.log(data)
    setIsValid(data.success);
  };

  return (
    <div>
      <h2>Validate 2FA Token</h2>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter the 2FA token"
      />
      <button onClick={validateToken}>Validate Token</button>
      {isValid !== null && (
        <p>{isValid ? 'Token is valid' : 'Invalid token, please try again'}</p>
      )}
    </div>
  );
};

export default ValidateToken;
