
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../api";

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    experience_years: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("/signup", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          full_name: form.full_name,
          experience_years: Number(form.experience_years)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      alert("Signup successful! Please login.");
      navigate("/signin");

    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0529] text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-2 rounded text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/20 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/20 outline-none"
        />

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/20 outline-none"
        />

        <input
          type="number"
          name="experience_years"
          placeholder="Experience (years)"
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/20 outline-none"
        />

        <div className="flex justify-center">
          <button
            disabled={loading}
            className="mt-8 bg-white text-purple-700 font-semibold px-6 py-3 rounded-full hover:scale-105 transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </div>

        <p className="text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="text-purple-400 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
