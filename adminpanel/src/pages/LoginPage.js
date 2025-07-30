import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Admin Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ display: "block", width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ display: "block", width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: "100%",
          padding: "0.5rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p style={{ marginTop: "1rem" }}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
}

export default LoginPage;
