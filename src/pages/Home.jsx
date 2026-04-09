import React from "react";
import { Link } from "react-router-dom";

function Home(){
  return (
    <div>
      <h1>Home Page 🏠</h1>
      <Link to="/login">Go to Login</Link><br/>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  )
}

export default Home;