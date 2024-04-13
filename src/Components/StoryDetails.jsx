import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

const StoryDetails = () => {
  const [singleStoryBeginning, setSingleStoryBeginning] = useState([]);
  const [allStoryEndingsForSingleStory, setAllStoryEndingsForSingleStory] =
    useState([]);

  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // this currently fetches all story endings, but what we actually want is to only fetch the story endings based on a story_beginning ID
      // this is set up in the backend but we need to pass the story_beginning Id of a clicked story_beginning to this view
      fetch(`${API}/api/story_beginnings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((storyBeginning) => {
          setSingleStoryBeginning(storyBeginning);
          return storyBeginning;
        })
        .then((storyBeginning) => {
          //passing story beginning object
          fetch(`${API}/api/story_endings/${storyBeginning.id}`)
            .then((response) => response.json())
            .then((storyEndings) => {
              setAllStoryEndingsForSingleStory(storyEndings);
            });
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, []);

  return (
    <div className="bg-slate-900">
      {console.log(singleStoryBeginning)}
      {console.log(allStoryEndingsForSingleStory)}
      <div className="bg-black text-white p-5 text-center">
        Story Details View
      </div>
      <div className="flex justify-center my-10">
        <div className="bg-slate-600 w-96 rounded-3xl my-10 shadow-xl">
          <h2 className="text-2xl bg-slate-700 py-2 text-slate-200 font-semibold p-3 shadow">
            {singleStoryBeginning.title}
          </h2>
          <hr className="border-2 border-teal-500" />
          <p className="pb-4 pt-3 pl-4 pr-4 text-slate-200 ">
            {singleStoryBeginning.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
