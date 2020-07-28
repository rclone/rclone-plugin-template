import React from 'react';
import './App.css';
import rcloneLogo from "./assets/rclone/logo_symbol.png"

function App() {
  return (
    <div data-test="appComponent">
      <img src={rcloneLogo} alt={"rclone"}/>
      Welcome to your first rclone webui plugin.
    </div>
  );
}

export default App;
