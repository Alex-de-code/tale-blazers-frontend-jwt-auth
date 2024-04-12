import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const Login = ({ setToggleLogin }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function postFetch(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      const data = await res.json();

      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        await setToggleLogin(true);
        navigate("/dashboard");
      } else {
        console.log("JWT Login Failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert("You must enter a username and password");
      return;
    }
    postFetch(user);
  }

  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const user = { username: "demo", password: "password" };
    postFetch(user);
  }

  return (
    <div className="bg-slate-900 pb-24">
      <h1 className="text-3xl text-center py-10 text-slate-200">
        Login Component
      </h1>
      <h2 className="text-center mb-10 text-slate-200">
        Use the DemoUser button to login and save time during your presentation
      </h2>
      <div className="flex justify-center">
        <button
          onClick={handleDemoSignIn}
          className="bg-lime-300 hover:bg-emerald-300 rounded px-2 py-2"
        >
          Demo User
        </button>
      </div>

      <h3 className="text-center my-10 text-slate-200">
        Below is the regular login form which should be functional
      </h3>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-96 grid gap-4 bg-white pt-8 pb-12 rounded-2xl shadow-2xl border-2
          border-slate-200"
        >
          <h2 className="text-2xl text-center font-semibold ">Login</h2>
          <label htmlFor="username" className="flex justify-center">
            <input
              id="username"
              value={user.username}
              type="text"
              placeholder="username"
              autoComplete="username"
              onChange={handleChange}
              className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
            />
          </label>

          <label htmlFor="password" className="flex justify-center">
            <input
              id="password"
              value={user.password}
              type="password"
              placeholder="password"
              onChange={handleChange}
              autoComplete="current-password"
              className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
            />
          </label>
          <div className="flex justify-center">
            <button className="bg-green-400 hover:bg-slate-200 rounded px-2 py-3 shadow-md w-3/4">
              Submit
            </button>
          </div>
          <div className="text-center mt-3">
            <p>
              No Account?{" "}
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
