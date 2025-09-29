// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios"; // Axios instance

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "",phone: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Wajib: CSRF cookie agar bisa pakai Sanctum
      await api.get("/sanctum/csrf-cookie");

      // 2. Kirim data ke endpoint register
      const res = await api.post("/api/register", formData);
      const data = res.data;

      // 3. Login otomatis setelah register
      login(data.user, data.token);

      // 4. Redirect ke homepage atau dashboard
      navigate("/");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Gagal mendaftar.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="mb-3 p-2 w-full border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-3 p-2 w-full border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          name="phone"
          type="text"
          placeholder="No. Telepon"
          value={formData.phone}
          onChange={handleChange}
          className="mb-3 p-2 w-full border rounded"
        />
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 w-full rounded">
          Register
        </button>
        <p className="mt-3 text-sm">
          Sudah punya akun? <a href="/login" className="text-red-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
