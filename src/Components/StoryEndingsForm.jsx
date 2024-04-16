import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const StoryEndingsForm = () => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const { storyBeginningId } = useParams();
  //state for form inputs
  const [newOrUpdatedEnding, setNewOrUpdatedEnding] = useState({
    id: "",
    title: "",
    body: "",
    story_beginnings_id: +storyBeginningId,
    user_id: user.id,
  });
  //state for setting storybeginning to display next to form view
  const [storyBeginning, setStoryBeginning] = useState({});

  const token = localStorage.getItem("token");

  const handleTextChange = (event) => {
    setNewOrUpdatedEnding({
      ...newOrUpdatedEnding,
      [event.target.id]: event.target.value,
    });
  };

  const addStoryEnding = () => {
    fetch(`${URL}/api/story_endings`, {
      method: "POST",
      body: JSON.stringify(newOrUpdatedEnding),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => navigate(`/storydetails/${+storyBeginningId}`))
      .catch((error) => console.error("catch", error));
  };

  const updateStoryEnding = () => {
    fetch(`${URL}/api/story_endings/${id}`, {
      method: "PUT",
      body: JSON.stringify(newOrUpdatedEnding),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => navigate(`/storydetails/${+storyBeginningId}`))
      .catch((error) => console.error("catch", error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit was clicked");
  };

  useEffect(() => {
    // console.log(storyBeginningId);

    if (storyBeginningId) {
      fetch(`${URL}/api/story_beginnings/${storyBeginningId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((storyBeginning) => {
          setStoryBeginning(storyBeginning.story);
          // return storyBeginning;
        })
        .catch((error) =>
          console.error("Error fetching storyBeginning data:", error)
        );
    }
  }, [storyBeginningId]);

  // console.log("new/update ending:", newOrUpdatedEnding);
  return (
    <div className="">
      <div className="bg-slate-900">
        <div className="px-4 py-12 text-center">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight mb-0 inline-block bg-slate-900 rounded-full px-1">
              Chart Your Own Course:
            </h1>
          </div>
          <div>
            <p className="text-lg md:text-xl text-white mb-0 inline-block bg-slate-900 rounded-full">
              Write Endings as Bold as the Story's Origins!
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 md:h-screen">
        <div className="col-span-1 md:col-span-3 bg-slate-900">
          <h1 className="text-2xl md:text-3xl text-white font-bold mb-2 text-center bg-center pt-10">
            How it started...
          </h1>
          <div className="flex justify-center">
            <div className="bg-slate-600 w-96 md:w-124 rounded-3xl mt-10 mb-5 shadow-xl">
              <span className="flex flex-row bg-slate-700 rounded-t-3xl">
                <h2 className="text-2xl py-2 text-slate-200 font-semibold p-3 shadow rounded-t-3xl">
                  {storyBeginning.title}
                </h2>
              </span>
              <hr className="border-2 border-teal-500" />
              <p className="pb-4 pt-3 pl-4 pr-4 text-slate-200">
                {storyBeginning.body}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 bg-slate-900">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center bg-center pt-10 text-teal-400">
            How it ends.
          </h1>
          <div className="flex justify-center mt-10">
            <form
              onSubmit={handleSubmit}
              className="w-96 md:w-124 grid gap-4 bg-white pt-8 pb-12 rounded-3xl shadow-2xl 
           border-4 border-slate-500 animate-float hover:animate-none"
            >
              <h2 className="text-2xl text-center font-semibold text-black">
                Story Ending Submission Form
              </h2>
              <label htmlFor="title" className="grid grid-row-2">
                <span className="ml-16 pl-2">Title:</span>
                <div className="flex justify-center">
                  <input
                    id="title"
                    // value={newOrUpdatedEnding.title}
                    type="text"
                    placeholder="name your ending"
                    // onChange={handleChange}
                    className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3 ml-4 mt-3"
                    required
                  />
                </div>
              </label>
              <label htmlFor="body" className="grid grid-row-2">
                <span className="ml-16 pl-2">Body:</span>
                <div className="flex items-center">
                  <textarea className="border-2 border-black mx-10 rounded shadow-mdresize-none w-100 h-100">
                    <input
                      id="body"
                      // value={newOrUpdatedEnding.body}
                      type="text"
                      placeholder=""
                      // onChange={handleChange}
                      className=""
                      required
                    />
                  </textarea>
                </div>
              </label>
              <div className="flex justify-center">
                <button className="bg-teal-400 hover:bg-slate-200 rounded px-2 py-3 shadow-md w-3/4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryEndingsForm;
