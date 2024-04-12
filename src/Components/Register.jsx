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
    <div style={{ textAlign: "center" }} className="bg-purple-400">
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="username"
            onChange={handleChange}
            autoComplete="username"
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
          />
        </label>

        <label htmlFor="profile_picture">
          <input
            id="profile_picture"
            value={user.profile_picture}
            type="text"
            pattern="http[s]*://.+"
            placeholder="http://"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="bio">
          <input
            id="bio"
            value={user.bio}
            type="text"
            placeholder="The bee's knees!"
            onChange={handleChange}
          />
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
