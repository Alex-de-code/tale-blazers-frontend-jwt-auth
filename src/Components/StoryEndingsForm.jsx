import React, { useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const StoryEndingsForm = () => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const { storyBeginningId, storyEndingId } = useParams();

  //state for form inputs
  const [newOrUpdatedEnding, setNewOrUpdatedEnding] = useState({
    title: "",
    body: "",
    story_beginnings_id: +storyBeginningId,
    user_id: user.id,
  });
  //state for setting storybeginning to display next to form view
  const [storyBeginning, setStoryBeginning] = useState({});

  //state for setting storyending when in edit form view
  // const [singleStoryEnding, setSingleStoryEnding] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
    fetch(`${URL}/api/story_endings/single/${storyEndingId}`, {
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
    // console.log("submit was clicked");
    if (storyEndingId) {
      updateStoryEnding();
    } else {
      addStoryEnding();
    }
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

  // STORY ENDING!!!!!!
  useEffect(() => {
    if (storyEndingId) {
      fetch(`${URL}/api/story_endings/single/${storyEndingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((singleStoryEnding) => {
          setNewOrUpdatedEnding({
            ...newOrUpdatedEnding,
            title: singleStoryEnding.title,
            body: singleStoryEnding.body,
          });
        })
        .catch((error) =>
          console.error("Error fetching storyEnding data:", error)
        );
    }
  }, []);

  // console.log("new/update ending:", newOrUpdatedEnding);
  return (
    <div className="bg-slate-900">
      <div className="">
        <div
          className="px-4 py-16 text-center"
          style={{
            backgroundImage: `url(${`https://res.cloudinary.com/dvmczcg3f/image/upload/c_crop,ar_16:9/v1713373914/wave-5_dp0bbg.png`})`,
            backgroundSize: "cover",
          }}
        >
          <div className=" p-10 backdrop-blur-sm inline-block rounded-xl">
            <div className="mb-4">
              <h1 className="text-4xl md:text-5xl text-white font-bold">
                Chart Your Own Course:
              </h1>
            </div>
            <div>
              <p className="text-lg md:text-xl text-white ">
                Write Endings as Bold as the Story's Origins!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 md:h-auto pb-16">
        <div className="col-span-1 md:col-span-3 bg-slate-900">
          <h1 className="text-2xl md:text-3xl text-white font-bold mb-2 text-center bg-center pt-24">
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center bg-center text-teal-400 pt-24">
            How it ends.
          </h1>
          <div className="flex justify-center mt-10">
            <form
              onSubmit={handleSubmit}
              className="w-96 md:w-124 grid gap-4 bg-slate-100  pt-8 pb-12 mb-24 rounded-3xl shadow-2xl  animate-float hover:animate-none"
            >
              <h2 className="text-2xl text-center font-semibold text-black">
                Create Your Ending
              </h2>
              <label htmlFor="title" className="grid grid-row-2">
                <span className="w-3/4 mx-auto text-lg">Title:</span>
                <div className="flex justify-center">
                  <input
                    id="title"
                    name="title"
                    value={newOrUpdatedEnding.title}
                    type="text"
                    placeholder="name it"
                    onChange={handleTextChange}
                    className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3 mt-3 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-teal-400"
                    required
                  />
                </div>
              </label>
              <label htmlFor="body" className="grid grid-row-2">
                <span className="w-3/4 mx-auto text-lg">Body:</span>
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
                    className=" mx-10 rounded shadow-md w-3/4 h-32 py-3 pl-3 mt-3 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-teal-400"
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
    </div>
  );
};

export default StoryEndingsForm;
