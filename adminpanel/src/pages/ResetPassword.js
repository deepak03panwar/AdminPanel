import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/reset-password", { token, newPassword });
      alert("Password updated");
      navigate("/");
    } catch (err) {
      alert("Invalid or expired token");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;
