import { useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const StoryEndingsComments = () => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const navigate = useNavigate();
  const { storyEndingId } = useParams();
  const token = localStorage.getItem("token");

  // state for setting storyending to display it
  const [storyEnding, setStoryEnding] = useState({});

  // state for comments for story ending
  const [allCommentsForThisStoryEnding, setAllCommentsForThisStoryEnding] =
    useState([]);

  //state for comment form inputs
  const [newStoryEndingComment, setNewStoryEndingComment] = useState({
    user_id: user ? user.id : "",
    body: "",
    tag: "",
  });

  const [charLimits, setCharLimits] = useState({
    body: 200,
    tag: 50,
  });

  // handleTextChange = (event) => {
  //   const { id, value } = event.target;
  //   const truncatedValue = value.slice(0, charLimits[id]); // text cut-off based on character limit key

  //   setNewStoryEndingComment({
  //     ...newStoryEndingComment,
  //     [id]: truncatedValue,
  //   });
  // };

  const addStoryEndingComment = () => {
    fetch(`${URL}/api/story_endings/comments`, {
      method: "POST",
      body: JSON.stringify(newStoryEndingComment),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((newStoryEndingComment) => {
        setAllCommentsForThisStoryEnding((previousComments) => [
          ...previousComments,
          newStoryEndingComment,
        ]);
      })
      .catch((error) => console.error("catch", error));
  };

  useEffect(() => {
    if (storyEndingId) {
      fetch(`${URL}/api/story_endings/single/${storyEndingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((storyEnding) => {
          setStoryEnding(storyEnding);
        })
        .catch((error) =>
          console.error("Error fetching storyEnding data:", error)
        );
    }
  }, [storyEndingId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${URL}/api/story_endings/comments/${storyEndingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((storyEndingComments) => {
          setAllCommentsForThisStoryEnding(storyEndingComments);
        })
        .catch((error) => console.error("catch", error));
    }
  }, []);

  console.log("This is the story ending", storyEnding);

  console.log(
    "These are the story ending comments",
    allCommentsForThisStoryEnding
  );

  return (
    <>
      <div className="bg-slate-900">
        <div className="text-3xl bg-red-400 text-center">
          StoryEndingsComments
        </div>
        <div>
          <div className="flex justify-center py-10">
            <div className="bg-slate-600/95 w-96 lg:w-192 rounded-3xl shadow-xl">
              <span className="flex flex-row bg-slate-600 rounded-t-3xl">
                <h2 className="text-2xl py-2 text-slate-200 font-semibold p-3 shadow rounded-t-3xl text-balance">
                  {storyEnding.title}
                </h2>
              </span>
              <hr className="border-2 border-slate-700" />
              <p className="pb-4 pt-3 pl-4 pr-4 text-slate-200 text-balance">
                {storyEnding.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryEndingsComments;
