import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { accessToken, loading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setFormError("Username and password are required.");
      return;
    }

    setFormError("");
    dispatch(login({ username, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (accessToken) {
      navigate(from, { replace: true });
    }
  }, [accessToken, from, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {formError && <p className="text-sm text-red-500 mb-4 text-center">{formError}</p>}
        {error && <p className="text-sm text-red-500 mb-4 text-center">{error}</p>}

        {!accessToken ? (
          <>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </p>
          </>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-green-600 text-sm break-all">
              <strong>Logged in successfully.</strong>
              <br />
              Token: {accessToken}
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
