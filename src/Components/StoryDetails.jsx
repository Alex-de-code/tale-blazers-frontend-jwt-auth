import { MoveLeft, MoveRight } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

const StoryDetails = () => {
  const [singleStoryBeginning, setSingleStoryBeginning] = useState([]);
  const [allStoryEndingsForSingleStory, setAllStoryEndingsForSingleStory] =
    useState([]);
  // this usestate sets index of storyEndings and for carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousEnding = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allStoryEndingsForSingleStory.length - 1 : prevIndex - 1
    );
  };

  const goToNextEnding = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allStoryEndingsForSingleStory.length - 1 ? 0 : prevIndex + 1
    );
  };

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
    <div className="bg-slate-900 h-screen">
      {/* {console.log(singleStoryBeginning)}
      {console.log(allStoryEndingsForSingleStory)} */}
      <div className="bg-black text-white p-5 text-center">
        Story Details View
      </div>
      <div className="flex justify-center pt-10">
        <div className="bg-slate-600 w-96 lg:w-192 rounded-t-3xl mt-10 mb-5 shadow-xl">
          <h2 className="text-2xl bg-slate-700 py-2 text-slate-200 font-semibold p-3 shadow rounded-t-3xl">
            {singleStoryBeginning.title}
          </h2>
          <hr className="border-2 border-teal-500" />
          <p className="pb-4 pt-3 pl-4 pr-4 text-slate-200 ">
            {singleStoryBeginning.body}
          </p>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <button
          onClick={goToPreviousEnding}
          className="mx-2 text-white py-2 px-4 hover:animate-ping"
        >
          <MoveLeft size={48} />
        </button>
        <div className="bg-slate-600 w-96 lg:w-192 shadow-xl rounded-3xl">
          <h2 className="text-2xl bg-slate-600 py-2 text-slate-200 font-semibold p-3 shadow">
            {allStoryEndingsForSingleStory[currentIndex]?.title}
          </h2>
          <hr className="border-2 border-slate-700" />
          <p className="pb-4 pt-3 pl-4 pr-4 text-slate-200">
            {allStoryEndingsForSingleStory[currentIndex]?.body}
          </p>
        </div>
        <button
          onClick={goToNextEnding}
          className="mx-2 text-white py-auto px-4 hover:animate-ping"
        >
          <MoveRight size={48} />
        </button>
      </div>
      <div className="text-white text-center">
        (Entry {currentIndex + 1} of {allStoryEndingsForSingleStory.length})
      </div>
    </div>
  );
};

export default StoryDetails;
