import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css"; 

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/admin/forgot-password", { email });
    setLink(res.data.resetLink);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        type="email"
      />
      <button onClick={handleSubmit}>Get Reset Link</button>
      {link && (
        <p>
          Reset Link: <a href={link}>{link}</a>
        </p>
      )}
    </div>
  );
}

export default ForgotPassword;
