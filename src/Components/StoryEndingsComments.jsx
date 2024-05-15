import { Sprout } from "lucide-react";
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

  const getTagStyles = (tag) => {
    switch (tag) {
      case "praise":
        return {
          borderColor: "border-teal-400/30",
          textColor: "text-teal-400/90",
          plantColor: "text-teal-400",
        };
      case "feedback":
        return {
          borderColor: "border-orange-500/30",
          textColor: "text-orange-500",
          plantColor: "text-orange-500",
        };
      default:
        return {
          borderColor: "border-gray-400",
          textColor: "text-gray-400",
          plantColor: "text-gray-500",
        };
    }
  };

  const formatTimeElapsed = (dateString) => {
    const currentDate = new Date();
    const date = new Date(dateString);
    const elapsedMilliseconds = currentDate - date;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedMonths = Math.floor(elapsedDays / 30);
    const elapsedYears = Math.floor(elapsedDays / 365);

    if (elapsedYears > 0) {
      const remainingMonths = elapsedMonths - elapsedYears * 12;
      return `${elapsedYears} year${
        elapsedYears > 1 ? "s" : ""
      } and ${remainingMonths} month${remainingMonths > 1 ? "s" : ""} ago`;
    } else if (elapsedMonths > 0) {
      return `${elapsedMonths} month${elapsedMonths > 1 ? "s" : ""} ago`;
    } else if (elapsedDays > 0) {
      return `${elapsedDays} day${elapsedDays > 1 ? "s" : ""} ago`;
    } else if (elapsedHours > 0) {
      return `${elapsedHours} hour${elapsedHours > 1 ? "s" : ""} ago`;
    } else if (elapsedMinutes > 0) {
      return `${elapsedMinutes} minute${elapsedMinutes > 1 ? "s" : ""} ago`;
    } else {
      return `${elapsedSeconds} second${elapsedSeconds > 1 ? "s" : ""} ago`;
    }
  };

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
      .catch((error) => console.error("Error adding comment:", error));
  };

  // fetching story ending to display above comment section
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

  // fetching comments for specific story ending
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
      <div className="bg-slate-900 flex flex-col min-h-screen">
        {/* <div className="text-3xl bg-red-400 text-center">
          StoryEndingsComments
        </div> */}
        <div className=" pt-36">
          <div className="">
            <div className="flex justify-center">
              <div className="bg-slate-600/95 w-96 lg:w-192 rounded-3xl shadow-xl">
                <span className="flex flex-row rounded-t-3xl">
                  <h2 className="text-2xl py-2 text-slate-200 font-semibold p-3 text-balance">
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
          <div className="py-8">
            <div className="flex justify-center">
              <div className="grid grid-rows-2">
                <div className=" text-white text-2xl font-medium ">
                  Comments
                </div>
                <hr className="border-2 bg-red-400 w-96 lg:w-192 rounded mt-3" />
              </div>
            </div>
          </div>
          {allCommentsForThisStoryEnding.length > 0 && (
            <div className="grid grid-cols-1 gap-6 pb-36">
              {allCommentsForThisStoryEnding.map((comment) => {
                const { borderColor, textColor, plantColor } = getTagStyles(
                  comment.tag
                );
                return (
                  <div key={comment.id} className="flex justify-center">
                    <div className="bg-slate-700/10 border-2 border-slate-200/10 hover:border-teal-400/90 w-96 lg:w-192 rounded-xl shadow-xl">
                      <div className="p-2.5">
                        <div className="flex flex-row items-center">
                          <span className="text-slate-200 px-2 flex flex-row items-center">
                            <img
                              src={`${comment.profile_picture}`}
                              alt="profile_picture"
                              className="w-9 rounded-full m-0 pr-1"
                            />
                            <div className="px-1">{comment.username}</div>
                            <Sprout
                              size={24}
                              className={`pr-1 ${plantColor}`}
                            />
                            <div className="">
                              {formatTimeElapsed(comment.created_at)}
                            </div>
                          </span>
                          {/* <div className="inline-block px-1.5 bg-slate-800 border-2 border-dashed  border-teal-400/40 rounded-full text-white">
                          {comment.tag}
                        </div> */}
                        </div>
                        <div className=" px-2 my-2 text-white">
                          {comment.body}
                        </div>
                        <div className="flex">
                          <div className="flex justify-start">
                            <div
                              className={`ml-2 inline-block px-1.5 bg-slate-900/30 border-2 border-dashed rounded-full ${borderColor} ${textColor}`}
                            >
                              {comment.tag}
                            </div>
                          </div>
                          {}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StoryEndingsComments;
