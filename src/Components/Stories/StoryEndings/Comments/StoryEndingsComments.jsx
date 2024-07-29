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

import {
  formatTimeElapsed,
  getTagStyles,
} from "./StoryEndingsCommentsHelper.js";
import { comment } from "postcss";
import StoryEndingStory from "./StoryEndingStory.jsx";

const URL = import.meta.env.VITE_BASE_URL;

const StoryEndingsComments = () => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const navigate = useNavigate();
  const { storyEndingId } = useParams();
  const token = localStorage.getItem("token");

  // state for setting storyending to display it
  const [storyEnding, setStoryEnding] = useState({});

  // // state for comments for story ending
  const [allCommentsForThisStoryEnding, setAllCommentsForThisStoryEnding] =
    useState([]);

  //state for toggling comments form visibility
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  //state for rendering a edit form for a comment or the comment itself, will take the ID of the comment we want to edit
  const [isEditing, setIsEditing] = useState(null);

  //state for comment's reactions
  const [commentReactions, setCommentReactions] = useState({}); // Track reactions for each comment
  const [commentToReactTo, setCommentToReactTo] = useState(null); // state for reaction to a comment
  const [userReactions, setUserReactions] = useState({}); // Track user reactions

  //state for new story ending comment
  const [newStoryEndingComment, setNewStoryEndingComment] = useState({
    user_id: user ? user.id : "",
    body: "",
    tag: "",
    story_endings_id: storyEndingId ? storyEndingId : "",
    is_flagged: false,
  });

  // state for editing story ending comment
  const [commentToEdit, setCommentToEdit] = useState(null);

  //state for remaining characters before limit is reached
  const [remainingChars, setRemainingChars] = useState({
    body: 1000,
    tag: 50,
  });

  const [charLimits, setCharLimits] = useState({
    body: 1000,
    tag: 50,
  });

  const toggleCommentForm = () => {
    setShowNewCommentForm(!showNewCommentForm);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    const truncatedValue = value.slice(0, charLimits[id]); // text cut-off based on character limit key

    if (isEditing !== null) {
      setCommentToEdit((prevComment) => ({
        ...prevComment,
        [id]: truncatedValue,
      }));
    } else {
      setNewStoryEndingComment({
        ...newStoryEndingComment,
        [id]: truncatedValue,
      });
    }

    setRemainingChars({
      ...remainingChars,
      [id]: charLimits[id] - truncatedValue.length,
    });
  };

  const addStoryEndingComment = () => {
    const commentData = {
      ...newStoryEndingComment,
      // user_id: user ? user.id : "",
      story_endings_id: storyEndingId,
      profile_picture: user ? user.profile_picture : "",
      username: user ? user.username : "",
    };

    fetch(`${URL}/api/story_endings/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((newStoryEndingComment) => {
        setAllCommentsForThisStoryEnding((previousComments) => {
          if (previousComments.length > 0) {
            console.log(newStoryEndingComment);
            return [newStoryEndingComment, ...previousComments];
          } else {
            console.log(newStoryEndingComment);
            return [newStoryEndingComment];
          }
        });
        // Reset the comment form state after successful submission
        setNewStoryEndingComment({
          user_id: user ? user.id : "",
          body: "",
          tag: "",
        });
        // Reset the remaining character count state as well if needed
        setRemainingChars({
          body: charLimits.body,
          tag: charLimits.tag,
        });
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  const updateStoryEndingComment = (storyEndingCommentId) => {
    // Find the comment with the matching ID
    const commentToChange = allCommentsForThisStoryEnding.find(
      (comment) => comment.id === storyEndingCommentId
    );

    if (!commentToEdit) {
      return;
    }

    setCommentToEdit(commentToChange);

    fetch(`${URL}/api/story_endings/comments/single/${storyEndingCommentId}`, {
      method: "PUT",
      body: JSON.stringify(commentToEdit),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Comment updated successfully");
          console.log(
            "This is Comment to edit in updateStoryEndingComment:",
            commentToEdit
          );
          setAllCommentsForThisStoryEnding((prevComments) =>
            prevComments.map((comment) =>
              comment.id === storyEndingCommentId ? commentToEdit : comment
            )
          );
        } else {
          console.log("Story Ending Comment ID number:", storyEndingCommentId);
          console.log("Failed to edit -->", commentToEdit);
          throw new Error("Failed to update comment");
        }
      })
      .catch((error) => console.error("Error updating comment:", error));
  };

  const handleDelete = (endingCommentId) => {
    if (allCommentsForThisStoryEnding.length > 0) {
      const token = localStorage.getItem("token");
      console.log("DELETED Story Ending Comment with ID:", endingCommentId);
      if (token) {
        fetch(`${URL}/api/story_endings/comments/single/${endingCommentId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              // If deletion is successful, you might want to refresh the list of story endings
              // You can either refetch the data or remove the deleted story ending from the state
              const updatedStoryEndingComments =
                allCommentsForThisStoryEnding.filter(
                  (ending) => ending.id !== endingCommentId
                );
              setAllCommentsForThisStoryEnding(updatedStoryEndingComments);
            } else {
              throw new Error("Failed to delete story ending comment");
            }
          })
          .catch((error) =>
            console.error("Error deleting story ending comment:", error)
          );
      }
    }
  };

  const handleCancel = () => {
    // Reset the comment form
    setNewStoryEndingComment({
      user_id: user ? user.id : "",
      body: "",
      tag: "",
    });

    // Reset the remaining character count
    setRemainingChars({
      body: charLimits.body,
      tag: charLimits.tag,
    });

    // hide form
    setShowNewCommentForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEditing !== null && commentToEdit) {
      updateStoryEndingComment(commentToEdit.id); // Update comment
      setCommentToEdit(null); // Reset edit state
    } else {
      addStoryEndingComment(); // Add new comment
    }

    // Reset form and remaining characters
    setNewStoryEndingComment({
      user_id: "",
      body: "",
      tag: "",
      story_endings_id: storyEndingId ? storyEndingId : "",
      is_flagged: false,
    });
    setRemainingChars({
      body: charLimits.body,
      tag: charLimits.tag,
    });

    setShowNewCommentForm(false);
  };

  const handleEditClick = (commentID) => {
    // Find the comment with the matching ID
    const comment = allCommentsForThisStoryEnding.find(
      (comment) => comment.id === commentID
    );
    // Populate the newStoryEndingComment state with the comment data
    console.log("This is the comment to edit", commentToEdit);
    // setNewStoryEndingComment(commentToEdit);
    // Set the commentToEdit state to the found comment
    setCommentToEdit(comment);
    // Set the isEditing state to the comment ID
    setIsEditing(commentID);
  };

  const handleCancelEdit = () => {
    setCommentToEdit(null); // Reset commentToEdit state to null
    setIsEditing(null); // Reset isEditing state
    setNewStoryEndingComment({
      user_id: user ? user.id : "",
      body: "",
      tag: "",
    });
  };

  // const handleReactions = (commentId, reactionType) => {
  //   const updatedReactions = { ...commentReactions };
  //   const currentLikes = updatedReactions[commentId]?.likes || 0;
  //   const currentDislikes = updatedReactions[commentId]?.dislikes || 0;
  //   const alreadyLiked = userReactions[commentId]?.liked;
  //   const alreadyDisliked = userReactions[commentId]?.disliked;

  //   if (reactionType === "like") {
  //     if (alreadyLiked) {
  //       // User already liked, remove like
  //       updatedReactions[commentId] = {
  //         likes: currentLikes - 1,
  //         dislikes: currentDislikes,
  //       };
  //       setUserReactions({
  //         ...userReactions,
  //         [commentId]: { liked: false, disliked: false },
  //       });
  //     } else {
  //       // User didn't like before, add like
  //       updatedReactions[commentId] = {
  //         likes: currentLikes + 1,
  //         dislikes: alreadyDisliked ? currentDislikes - 1 : currentDislikes,
  //       };
  //       setUserReactions({
  //         ...userReactions,
  //         [commentId]: { liked: true, disliked: false },
  //       });
  //     }
  //   } else if (reactionType === "dislike") {
  //     if (alreadyDisliked) {
  //       // User already disliked, remove dislike
  //       updatedReactions[commentId] = {
  //         likes: currentLikes,
  //         dislikes: currentDislikes - 1,
  //       };
  //       setUserReactions({
  //         ...userReactions,
  //         [commentId]: { liked: false, disliked: false },
  //       });
  //     } else {
  //       // User didn't dislike before, add dislike
  //       updatedReactions[commentId] = {
  //         likes: alreadyLiked ? currentLikes - 1 : currentLikes,
  //         dislikes: currentDislikes + 1,
  //       };
  //       setUserReactions({
  //         ...userReactions,
  //         [commentId]: { liked: false, disliked: true },
  //       });
  //     }
  //   }
  //   console.log("This is the ID of the comment we want to react to:");
  //   console.log("Current Likes", currentLikes);
  //   console.log("Current Dislikes", currentDislikes);

  //   // setCommentReactions(updatedReactions);
  //   // Update state with the new reaction counts
  //   setCommentReactions({
  //     ...commentReactions,
  //     [commentId]: updatedReactions[commentId],
  //   });
  //   // Log the updated reaction counts to the console
  //   console.log("Updated Reaction Counts:", updatedReactions[commentId]);
  // };

  // fetching story ending to display above comment section

  // const handleReactions = (commentId, reactionType) => {
  //   const updatedReactions = { ...commentReactions };
  //   const currentLikes = updatedReactions[commentId]?.likes || 0;
  //   const currentDislikes = updatedReactions[commentId]?.dislikes || 0;
  //   const alreadyLiked = userReactions[commentId]?.liked;
  //   const alreadyDisliked = userReactions[commentId]?.disliked;

  //   if (reactionType === "like") {
  //     if (alreadyLiked) {
  //       updatedReactions[commentId] = {
  //         likes: currentLikes - 1,
  //         dislikes: currentDislikes,
  //       };
  //       setUserReactions({
  //         ...userReactions,
  //         [commentId]: { liked: false, disliked: false },
  //       });
  //     } else {
  //       updatedReactions[commentId] = {
  //         likes: currentLikes + 1,
  //         dislikes: alreadyDisliked ? currentDislikes - 1 : currentDislikes,
  //       };
  //       setUserReactions({
  //         ...userReactions,
  //         [commentId]: { liked: true, disliked: false },
  //       });
  //     }
  //   } else if (reactionType === "dislike") {
  //     if (alreadyDisliked) {
  //       updatedReactions[commentId] = {
  //         likes: currentLikes,
  //         dislikes: currentDislikes - 1,
  //       };
  //       setUserReactions({
  //         ...userReactions,
  //         [commentId]: { liked: false, disliked: false },
  //       });
  //     } else {
  //       updatedReactions[commentId] = {
  //         likes: alreadyLiked ? currentLikes - 1 : currentLikes,
  //         dislikes: currentDislikes + 1,
  //       };
  //       setUserReactions({
  //         ...userReactions,
  //         [commentId]: { liked: false, disliked: true },
  //       });
  //     }
  //   }

  //   setCommentReactions(updatedReactions); // Update state with the new reaction counts

  //   // Send API request to update reactions in the database
  //   fetch(`${URL}/api/story_endings/comments/reactions/${commentId}`, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       likes: updatedReactions[commentId].likes,
  //       dislikes: updatedReactions[commentId].dislikes,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to update reactions");
  //       }
  //     })
  //     .catch((error) => console.error("Error updating reactions:", error));
  // };

  const handleReactions = async (commentId, reactionType) => {
    try {
      const response = await fetch(
        `${URL}/api/story_endings/comments/${commentId}/reactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reaction_type: reactionType }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add reaction");
      }

      const updatedComment = await response.json();

      setAllCommentsForThisStoryEnding((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, reactions: updatedComment.reactions }
            : comment
        )
      );

      // Update user reactions
      setUserReactions((prevUserReactions) => ({
        ...prevUserReactions,
        [commentId]: {
          liked: reactionType === "like",
          disliked: reactionType === "dislike",
        },
      }));
    } catch (error) {
      console.error("Error handling reaction:", error);
      // Handle error (show message or retry logic)
    }
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

  // fetching all comments for specific story ending
  useEffect(() => {
    if (storyEndingId) {
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
    }
  }, [storyEndingId, allCommentsForThisStoryEnding]);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     fetch(`${URL}/api/story_endings/comments/${storyEndingId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((storyEndingComments) => {
  //         setAllCommentsForThisStoryEnding(storyEndingComments);

  //         // Fetch reactions for each comment
  //         storyEndingComments.forEach((comment) => {
  //           fetch(`${URL}/api/story_endings/comments/reactions/${comment.id}`, {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           })
  //             .then((response) => response.json())
  //             .then((reactions) => {
  //               setCommentReactions((prevReactions) => ({
  //                 ...prevReactions,
  //                 [comment.id]: {
  //                   likes: reactions.likes,
  //                   dislikes: reactions.dislikes,
  //                 },
  //               }));
  //             })
  //             .catch((error) =>
  //               console.error("Error fetching reactions for comment:", error)
  //             );
  //         });
  //       })
  //       .catch((error) => console.error("Error fetching comments:", error));
  //   }
  // }, [storyEndingId]);

  // this useEffect is for when a user wants to update one of their comments!!
  useEffect(() => {
    if (commentToEdit) {
      fetch(`${URL}/api/story_endings/single/${commentToEdit.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((singleStoryEndingComment) => {
          setNewStoryEndingComment({
            ...singleStoryEndingComment,
          });
        })
        .catch((error) =>
          console.error("Error fetching singe storyEnding comment data:", error)
        );
    }
  }, [newStoryEndingComment.id]);

  useEffect(() => {
    if (commentToReactTo) {
      fetch(`${URL}/api/story_endings/comments/reactions/${commentToReactTo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((reactions) => {
          setCommentReactions((prevReactions) => ({
            ...prevReactions,
            [commentToReactTo]: {
              likes: reactions.likes,
              dislikes: reactions.dislikes,
            },
          }));
          console.log("These are the comment Reactions", commentReactions);
        })
        .catch((error) =>
          console.error(
            "Error fetching reactions for this specific comment:",
            error
          )
        );
    }
  }, [commentToReactTo]);

  return (
    <>
      <div className="bg-slate-900 flex flex-col min-h-screen">
        {/* <div className="text-3xl bg-red-400 text-center">
          StoryEndingsComments
        </div> */}
        <div className=" pt-36">
          <StoryEndingStory storyEnding={storyEnding} />
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
                <form onSubmit={handleSubmit} className="p-2.5">
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
                      {/* <div className="">
                        {formatTimeElapsed(
                          newStoryEndingComment.created_at
                        )}
                      </div> */}
                    </span>
                    {/* <div className="inline-block px-1.5 bg-slate-800 border-2 border-dashed  border-teal-400/40 rounded-full text-white">
                          {comment.tag}
                        </div> */}
                  </div>
                  <div className="text-white mx-2 my-2">
                    <label htmlFor="tag">Is this praise or feedback?</label>
                    <select
                      id="tag"
                      name="tag"
                      value={newStoryEndingComment.tag}
                      onChange={handleChange}
                      maxLength={charLimits.tag}
                      className="bg-transparent border-2 rounded ml-2"
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
                  <div className="text-white">
                    <label htmlFor="body"></label>
                    <textarea
                      id="body"
                      name="body"
                      value={newStoryEndingComment.body}
                      onChange={handleChange}
                      maxLength={charLimits.body}
                      className="bg-transparent w-full px-2 my-2 rounded-lg border-white border-2"
                      // className="h-full flex-grow outline-none "
                      required
                    />
                    <div className="text-center text-sm text-gray-400">
                      Remaining characters: {remainingChars.body}
                    </div>
                  </div>
                  <div className="flex justify-around mt-2">
                    <input
                      type="submit"
                      value="Submit"
                      className="hover:text-white p-0.5 border-2 border-emerald-500 hover:border-white rounded-lg text-emerald-500 w-3/5"
                    />
                    <button
                      onClick={handleCancel}
                      className="hover:text-white p-0.5 border-2 border-red-500 hover:border-white rounded-lg text-red-500 w-1/3"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {allCommentsForThisStoryEnding &&
          allCommentsForThisStoryEnding.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 pb-36">
              {allCommentsForThisStoryEnding
                .slice() // create a copy to avoid mutating state
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // sort by created_at descending
                .map((comment, index) => {
                  const { borderColor, textColor, plantColor } = getTagStyles(
                    comment.tag
                  );
                  return (
                    <div key={comment.id} className="flex justify-center">
                      <div className="bg-slate-700/5 border-2 border-transparent hover:border-solid hover:border-teal-400/5 w-96 lg:w-192 rounded-xl shadow-xl">
                        {isEditing === comment.id && commentToEdit ? (
                          <form onSubmit={handleSubmit} className="p-2.5">
                            <div className="flex flex-row items-center">
                              <span className="text-slate-200 px-2 flex flex-row items-center">
                                <img
                                  src={`${user.profile_picture}`}
                                  alt="profile_picture"
                                  className="w-9 rounded-full m-0 pr-1"
                                />
                                <div className="px-1">{user.username}</div>

                                <div
                                  className={`ml-1 mr-2 flex items-center px-1.5 bg-slate-900/30 border-2 border-dashed rounded-full 
                      ${getTagStyles(comment.tag).borderColor}
                                  ${getTagStyles(comment.tag).textColor}`}
                                >
                                  <Sprout
                                    size={24}
                                    className={`pr-1 ${
                                      getTagStyles(comment.tag).plantColor
                                    }`}
                                  />
                                  {comment.tag}
                                </div>
                                {/* <div className="">
                        {formatTimeElapsed(
                          newStoryEndingComment.created_at
                        )}
                      </div> */}
                              </span>
                              {/* <div className="inline-block px-1.5 bg-slate-800 border-2 border-dashed  border-teal-400/40 rounded-full text-white">
                          {comment.tag}
                        </div> */}
                            </div>
                            <div className="text-white mx-2 my-2">
                              <label htmlFor="tag">
                                Is this praise or feedback?
                              </label>
                              {commentToEdit && (
                                <select
                                  id="tag"
                                  name="tag"
                                  value={commentToEdit.tag}
                                  onChange={handleChange}
                                  maxLength={charLimits.tag}
                                  className="bg-transparent border-2 rounded ml-2"
                                  required
                                >
                                  <option value="">Select a tag</option>
                                  <option
                                    value="praise"
                                    style={getTagStyles("praise")}
                                  >
                                    Praise
                                  </option>
                                  <option
                                    value="feedback"
                                    style={getTagStyles("feedback")}
                                  >
                                    Feedback
                                  </option>
                                </select>
                              )}
                            </div>
                            <div className="text-white">
                              <label htmlFor="body"></label>
                              <textarea
                                id="body"
                                name="body"
                                value={commentToEdit.body}
                                onChange={handleChange}
                                maxLength={charLimits.body}
                                className="bg-transparent w-full px-2 my-2 rounded-lg border-white border-2"
                                // className="h-full flex-grow outline-none "
                                required
                              />
                              <div className="text-center text-sm text-gray-400">
                                Remaining characters: {remainingChars.body}
                              </div>
                            </div>
                            <div className="flex justify-around mt-2">
                              <input
                                type="submit"
                                value="Submit"
                                className="hover:text-white p-0.5 border-2 border-emerald-500 hover:border-white rounded-lg text-emerald-500 w-3/5"
                              />
                              <button
                                onClick={handleCancelEdit}
                                className="hover:text-white p-0.5 border-2 border-red-500 hover:border-white rounded-lg text-red-500 w-1/3"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="p-2.5">
                            <div className="flex flex-row items-center">
                              <span className="text-slate-200 px-2 flex flex-row items-center">
                                {comment.profile_picture && (
                                  <img
                                    src={`${comment.profile_picture}`}
                                    alt="profile_picture"
                                    className="w-9 rounded-full m-0 pr-1"
                                  />
                                )}
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
                              <div className="">
                                <span className="flex flex-row items-center">
                                  <div
                                    className="text-emerald-500 hover:animate-pulse hover:bg-blue-900/50 rounded-full"
                                    onClick={() => {
                                      setCommentToReactTo(comment.id),
                                        handleReactions(comment.id, "like");
                                    }}
                                  >
                                    <ChevronsUp size={30} className="" />{" "}
                                    <p>
                                      {" "}
                                      {commentReactions[comment.id]?.likes}
                                    </p>
                                  </div>
                                  <div
                                    className=" text-purple-500 hover:animate-pulse hover:bg-red-900/50 rounded-full"
                                    onClick={() => {
                                      setCommentToReactTo(comment.id),
                                        handleReactions(comment.id, "dislike");
                                    }}
                                  >
                                    <ChevronsDown
                                      size={30}
                                      className="rounded-full"
                                    />{" "}
                                    <p className="">
                                      {" "}
                                      {commentReactions[comment.id]?.dislikes}
                                    </p>
                                  </div>
                                  {user.id !== comment.user_id && (
                                    <button className=" hover:bg-slate-300 text-red-400 hover:text-red-600 font-semibold p-1 m-1 rounded-full flex items-center ml-auto">
                                      <Flag size={20} className="" />
                                    </button>
                                  )}
                                  {user.id === comment.user_id && (
                                    <div className="ml-auto flex items-center">
                                      <button
                                        onClick={() => {
                                          updateStoryEndingComment(comment.id);
                                          handleEditClick(comment.id);
                                        }}
                                        className="text-yellow-500 hover:bg-amber-400/55 hover:text-black font-semibold p-1 m-1 rounded-full inline-flex items-center ml-auto"
                                      >
                                        <PencilLine size={24} />
                                      </button>
                                      <button
                                        onClick={() => handleDelete(comment.id)}
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
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <>
              {!showNewCommentForm && (
                <div className="flex justify-center">
                  <div className="border-2 border-solid border-teal-400/5 w-96 lg:w-192 rounded-xl shadow-xl text-slate-200 text-center text-xl p-3 mb-24">
                    There are no comments at this time{" "}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StoryEndingsComments;
