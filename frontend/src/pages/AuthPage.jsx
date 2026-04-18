import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHero from "../components/AuthHero";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }

      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <AuthHero />

        <div className="auth-form-panel">
          <div>
            <div className="auth-tabs">
              <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
                Login
              </button>
              <button type="button" className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
                Register
              </button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
              <p>
                {mode === "login"
                  ? "Continue building your internship pipeline."
                  : "Start tracking every opportunity in one place."}
              </p>

              {mode === "register" && (
                <label>
                  Full name
                  <input name="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
                </label>
              )}

              <label>
                Email
                <input name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
              </label>

              <label>
                Password
                <input name="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
              </label>

              {error && <div className="form-error">{error}</div>}

              <button className="primary-button auth-submit" disabled={loading} type="submit">
                {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
              </button>

              <div className="auth-switch">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
                  {mode === "login" ? "Register" : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
