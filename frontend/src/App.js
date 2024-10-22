import './App.css';
import logo from './logo.svg';
import Home from './pages/Home';
import { useState } from "react";
import TwoFactorAuth from './pages/twoFactorAuth';
import ValidateToken from './pages/validateToken';

function App() {
  const [secret, setSecret] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <TwoFactorAuth setSecret={setSecret} />
        <ValidateToken secret={secret} />
      </header>
    </div>
  );
}

export default App;
