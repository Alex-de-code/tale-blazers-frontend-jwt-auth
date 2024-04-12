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
    <div>
      {console.log(singleStoryBeginning)}
      {console.log(allStoryEndingsForSingleStory)}
      <div className="bg-black text-white p-5 text-center">
        Story Details View
      </div>
      <div></div>
    </div>
  );
};

export default StoryDetails;
