import {
  Sprout,
  Flag,
  PencilLine,
  Trash2,
  ChevronsUp,
  ChevronsDown,
  MessageSquarePlus,
} from "lucide-react";
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

  //state for toggling comments form visibility
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

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

  const toggleCommentForm = () => {
    setShowNewCommentForm(!showNewCommentForm);
  };

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
                <span className="flex flex-row items-center">
                  <div className=" text-white text-2xl font-medium ">
                    Comments
                  </div>
                  <button
                    onClick={toggleCommentForm}
                    className="flex items-center ml-auto rounded-full text-teal-400 border-2 border-teal-400 hover:border-white hover:text-white p-1.5"
                  >
                    <MessageSquarePlus size={26} />
                  </button>
                </span>
                <hr className="border-2 bg-red-400 w-96 lg:w-192 rounded mt-3" />
              </div>
            </div>
          </div>
          {showNewCommentForm && (
            <div className="flex justify-center mb-6">
              <div className="bg-slate-700/5 border-2 border-transparent hover:border-solid hover:border-teal-400/5 w-96 lg:w-192 rounded-xl shadow-xl">
                <form action="" className="p-2.5">
                  <div className="flex flex-row items-center">
                    <span className="text-slate-200 px-2 flex flex-row items-center">
                      <img
                        src={`${user.profile_picture}`}
                        alt="profile_picture"
                        className="w-9 rounded-full m-0 pr-1"
                      />
                      <div className="px-1">{user.username}</div>

                      <div
                        className={`ml-1 mr-2 flex items-center px-1.5 bg-slate-900/30 border-2 border-dashed rounded-full ${
                          getTagStyles(newStoryEndingComment.tag).borderColor
                        } ${getTagStyles(newStoryEndingComment.tag).textColor}`}
                      >
                        <Sprout
                          size={24}
                          className={`pr-1 ${
                            getTagStyles(newStoryEndingComment.tag).plantColor
                          }`}
                        />
                        {newStoryEndingComment.tag}
                      </div>
                      <div className="">
                        {formatTimeElapsed(newStoryEndingComment.created_at)}
                      </div>
                    </span>
                    {/* <div className="inline-block px-1.5 bg-slate-800 border-2 border-dashed  border-teal-400/40 rounded-full text-white">
                          {comment.tag}
                        </div> */}
                  </div>
                  <div className="text-white">
                    <label htmlFor="body">Body:</label>
                    <textarea
                      id="body"
                      name="body"
                      value={newStoryEndingComment.body}
                      // onChange={handleChange}
                      // className="h-full flex-grow outline-none "
                      required
                    />
                  </div>
                  <div className="text-white">
                    <label htmlFor="tag">Tag:</label>
                    <select
                      id="tag"
                      name="tag"
                      value={newStoryEndingComment.tag}
                      // onChange={handleChange}
                      required
                    >
                      <option value="">Select a tag</option>
                      <option value="praise" style={getTagStyles("praise")}>
                        Praise
                      </option>
                      <option value="feedback" style={getTagStyles("feedback")}>
                        Feedback
                      </option>
                    </select>
                  </div>
                  <div className="flex justify-around mt-2">
                    <input
                      type="submit"
                      value="Submit"
                      className="hover:text-white p-0.5 border-2 border-emerald-500 hover:border-white rounded-lg text-emerald-500 w-3/5"
                    />
                    <button className="hover:text-white p-0.5 border-2 border-red-500 hover:border-white rounded-lg text-red-500 w-1/3">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {allCommentsForThisStoryEnding.length > 0 && (
            <div className="grid grid-cols-1 gap-6 pb-36">
              {allCommentsForThisStoryEnding.map((comment) => {
                const { borderColor, textColor, plantColor } = getTagStyles(
                  comment.tag
                );
                return (
                  <div key={comment.id} className="flex justify-center">
                    <div className="bg-slate-700/5 border-2 border-transparent hover:border-solid hover:border-teal-400/5 w-96 lg:w-192 rounded-xl shadow-xl">
                      <div className="p-2.5">
                        <div className="flex flex-row items-center">
                          <span className="text-slate-200 px-2 flex flex-row items-center">
                            <img
                              src={`${comment.profile_picture}`}
                              alt="profile_picture"
                              className="w-9 rounded-full m-0 pr-1"
                            />
                            <div className="px-1">{comment.username}</div>

                            <div
                              className={`ml-1 mr-2 flex items-center px-1.5 bg-slate-900/30 border-2 border-dashed rounded-full ${borderColor} ${textColor}`}
                            >
                              <Sprout
                                size={24}
                                className={`pr-1 ${plantColor}`}
                              />
                              {comment.tag}
                            </div>
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
                        <div className="">
                          {/* <div className="justify-start">
                            <div
                              className={`ml-2 inline-block px-1.5 bg-slate-900/30 border-2 border-dashed rounded-full ${borderColor} ${textColor}`}
                            >
                              {comment.tag}
                            </div>
                          </div> */}
                          {/* {user.id !== comment.user_id && ( */}
                          <div className="">
                            <span className="flex flex-row items-center">
                              <div className="text-emerald-500 hover:animate-pulse hover:bg-blue-900/50 rounded-full">
                                <ChevronsUp size={30} className="" />
                              </div>
                              <div className=" text-purple-500 hover:animate-pulse hover:bg-red-900/50 rounded-full">
                                <ChevronsDown
                                  size={30}
                                  className="rounded-full"
                                />
                              </div>
                              {user.id !== comment.user_id && (
                                <button className=" hover:bg-slate-300 text-red-400 hover:text-red-600 font-semibold p-1 m-1 rounded-full flex items-center ml-auto">
                                  <Flag size={20} className="" />
                                </button>
                              )}
                              {user.id === comment.user_id && (
                                <div className="ml-auto flex items-center">
                                  <button
                                    // NEED TO MAKE ONCLICK FOR COMMENT EDIT FORM
                                    // onClick={() =>
                                    //   navigateToNewStoryEndingFormEdit(
                                    //     allStoryEndingsForSingleStory[currentIndex]
                                    //       ?.id
                                    //   )
                                    // }
                                    className="text-yellow-400 hover:bg-amber-300/55 hover:text-black font-semibold p-1 m-1 rounded-full inline-flex items-center ml-auto"
                                  >
                                    <PencilLine size={24} />
                                  </button>
                                  <button
                                    // NEED TO MAKE ONCLICK FOR COMMENT EDIT FORM
                                    // onClick={() =>
                                    //   handleDelete(
                                    //     allStoryEndingsForSingleStory[currentIndex]
                                    //       ?.id
                                    //   )
                                    // }
                                    className=" text-red-400 hover:bg-slate-300 hover:text-red-600 font-semibold p-1 m-1 rounded-full inline-flex items-center"
                                  >
                                    <Trash2 size={24} />
                                  </button>
                                </div>
                              )}
                            </span>
                          </div>
                          {/* )} */}
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
