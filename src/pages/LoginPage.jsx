import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBanner from "../components/StatusBanner";
import API from "../services/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "info", message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setStatus({ type: "info", message: "" });

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("hospitalUser", JSON.stringify(res.data.user));
      setStatus({ type: "success", message: "Login successful. Redirecting to dashboard..." });
      setTimeout(() => navigate("/dashboard"), 700);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Admin Access</span>
        <h1>Login to the hospital portal</h1>
        <p>Use the demo credentials to explore the dashboard and management screens.</p>

        <div className="credential-card">
          <strong>Demo Login</strong>
          <span>Email: admin@gmail.com</span>
          <span>Password: 1234</span>
        </div>

        <StatusBanner type={status.type} message={status.message} />

        <div className="form-grid single-column">
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@gmail.com"
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="1234"
            />
          </label>
        </div>

        <button type="button" className="primary-button wide-button" onClick={handleLogin}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </div>
    </section>
  );
}

export default LoginPage;
