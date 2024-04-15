import React, { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const StoryEndingsForm = () => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const { storyBeginningId } = useParams;
  //state for form inputs
  const [newOrUpdatedEnding, setNewOrUpdatedEnding] = useState({
    title: "",
    body: "",
    story_beginnings_id: storyBeginningId,
    user_id: user.id,
  });

  const handleTextChange = (event) => {
    setNewOrUpdatedEnding({
      ...newOrUpdatedEnding,
      [event.target.id]: event.target.value,
    });
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();

  //     const url = review;
  //   };

  console.log(newOrUpdatedEnding);
  return <div className="bg-red-500">StoryEndingsForm</div>;
};

export default StoryEndingsForm;
