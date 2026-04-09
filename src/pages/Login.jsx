import React from "react";
import React, { useState } from "react";
import API from "../services/api";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      alert(res.data.message);
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h1>Login 🔐</h1>
      <input onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
      <input onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;