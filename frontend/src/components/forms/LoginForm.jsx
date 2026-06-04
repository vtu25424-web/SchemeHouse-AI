import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      // SAFE RESPONSE HANDLING
      const response = res?.data || res;

      console.log("LOGIN RESPONSE:", response);

      // Token handling (supports both formats)
      const token = response?.token || response?.access_token;

      if (token) {
        localStorage.setItem("token", token);
      }

      // Email handling
      const email = response?.user?.email || response?.email;

      if (email) {
        localStorage.setItem("email", email);
      }

      alert("Login successful");

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Login
      </button>

    </form>
  );
}

export default LoginForm;