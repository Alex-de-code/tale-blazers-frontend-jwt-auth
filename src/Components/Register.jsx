import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const Register = ({ setToggleLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    profile_picture: "",
    bio: "",
  });

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/register`, options);

      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();

      if (data.token) {
        // in case there is an old token in the browser, remove it
        localStorage.removeItem("token");
        // set the new user's JWT token in the browser
        localStorage.setItem("token", data.token);
        setToggleLogin(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // USE THIS FORM TO BUILD OUT YOUR FORM PROPERLY BY ADDING LABELS AND INPUTS AS WELL AS WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE CODE

  return (
    <div style={{ textAlign: "center" }} className="bg-slate-900 h-screen">
      <div className="text-center pt-16 pb-10">
        <h1 className="text-3xl md:text-5xl text-slate-200">
          Excited to begin your journey on Tale Blazers?
        </h1>
        <h2 className="text-xl md:text-2xl text-slate-200 mt-2">
          Register here to become a part of our growing community!
        </h2>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-96 grid gap-4 bg-white pt-8 pb-12 rounded-2xl shadow-2xl border-2
          border-slate-200"
        >
          <h2 className="text-2xl text-center font-semibold ">Register</h2>

          <label htmlFor="username">
            <input
              id="username"
              value={user.username}
              type="text"
              placeholder="username"
              onChange={handleChange}
              autoComplete="username"
              className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
              required
            />
          </label>

          <label htmlFor="email">
            <input
              id="email"
              value={user.email}
              type="email"
              placeholder="email"
              onChange={handleChange}
              autoComplete="email"
              className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
              required
            />
          </label>

          <label htmlFor="password">
            <input
              id="password"
              value={user.password}
              type="password"
              placeholder="password"
              onChange={handleChange}
              autoComplete="current-password"
              className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
              required
            />
          </label>

          <label htmlFor="profile_picture">
            <input
              id="profile_picture"
              value={user.profile_picture}
              type="text"
              pattern="http[s]*://.+"
              placeholder="profile image url in http://"
              onChange={handleChange}
              className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
            />
          </label>

          <label htmlFor="bio">
            <input
              id="bio"
              value={user.bio}
              type="text"
              placeholder="brief bio about yourself"
              onChange={handleChange}
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
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
