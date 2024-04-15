import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";
import StoryDetails from "./Components/StoryDetails";
import "./App.css";
import StoryEndingsForm from "./Components/StoryEndingsForm";

const API = import.meta.env.VITE_BASE_URL;

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);
  //state for storyBeginnings data
  const [storyBeginnings, setStoryBeginnings] = useState([]);

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  useEffect(() => {
    fetch(`${API}/api/story_beginnings`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => setStoryBeginnings(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />

      <Routes>
        <Route
          path="/"
          element={<LandingPage storyBeginnings={storyBeginnings} />}
        />
        <Route
          path="/login"
          element={<Login setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />

        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} />}
          />
          <Route path="/storydetails/:id" element={<StoryDetails />} />
          <Route
            path="/storyendings_form/:id/new"
            element={<StoryEndingsForm />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
