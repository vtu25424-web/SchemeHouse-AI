import { useState } from "react";
import { loginUser } from "../../services/authService";

function LoginForm() {

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

      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "userEmail",
        formData.email
      );
      
      alert("Login successful");

      console.log(data);

    } catch (error) {

      alert("Login failed");

    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button type="submit">
        Login
      </button>

    </form>
  );
}

export default LoginForm;