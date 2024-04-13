import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StoryBeginningsIndex from "./StoryBeginningsIndex";

function LandingPage({ storyBeginnings }) {
  return (
    <div className="">
      <h1 className="text-3xl text-center my-5 ">Landing Page</h1>
      <StoryBeginningsIndex storyBeginnings={storyBeginnings} />
    </div>
  );
}

export default LandingPage;
