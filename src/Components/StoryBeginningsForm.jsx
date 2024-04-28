import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

const URL = import.meta.env.VITE_BASE_URL;

const StoryBeginningsForm = () => {
  const { user } = useOutletContext; // Access user data provided by the Outlet's context
  const navigate = useNavigate();

  //state for form inputs
  const [newBeginning, SetNewBeginning] = useState({
    user_id: user.id,
    title: "",
    genre: "",
    description: "",
    body: "",
  });

  const handleTextChange = (event) => {
    SetNewBeginning({ ...newBeginning, [event.target.id]: event.target.value });
  };

  const addStoryBeginning = () => {
    fetch(`${URL}/api/story_beginnings`, {
      method: "POST",
      body: JSON.stringify(newBeginning),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => navigate(`/storydetails/${newBeginning.id}`))
      .catch((error) => console.error("catch", error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit was clicked");
  };

  return (
    <div>
      <div className="col-span-1 md:col-span-3 bg-slate-900">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center bg-center text-teal-400 pt-24">
          How it ends.
        </h1>
        <div className="flex justify-center mt-10">
          <form
            onSubmit={handleSubmit}
            className="w-96 md:w-124 grid gap-4 bg-white  pt-8 pb-12 mb-24 rounded-3xl shadow-2xl  animate-float hover:animate-none"
          >
            <h2 className="text-2xl text-center font-semibold text-black">
              Create Your Ending
            </h2>
            <label htmlFor="title" className="grid grid-row-2">
              <span className="ml-16">Title:</span>
              <div className="flex justify-center">
                <input
                  id="title"
                  name="title"
                  value={newOrUpdatedEnding.title}
                  type="text"
                  placeholder="name it"
                  onChange={handleTextChange}
                  className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3 mt-3"
                  required
                />
              </div>
            </label>
            <label htmlFor="body" className="grid grid-row-2">
              <span className="ml-16">Body:</span>
              <div className="flex items-center justify-center">
                <textarea
                  id="body"
                  name="body"
                  type="text"
                  value={newOrUpdatedEnding.body}
                  placeholder="tell it"
                  onChange={handleTextChange}
                  // className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3 ml-4 mt-3"
                  required
                  className=" mx-10 rounded shadow-md w-3/4 h-32 py-3 pl-3 mt-3"
                ></textarea>
              </div>
            </label>
            <div className="flex justify-center">
              <button className="bg-orange-500 hover:bg-slate-200 rounded px-2 py-3 shadow-md w-3/4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoryBeginningsForm;
