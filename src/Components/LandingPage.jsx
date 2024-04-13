import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StoryBeginningsIndex from "./StoryBeginningsIndex";

function LandingPage({ storyBeginnings }) {
  return (
    <div className="bg-slate-900">
      <h1 className="text-3xl text-center py-5 bg-slate-400">Landing Page</h1>
      <StoryBeginningsIndex storyBeginnings={storyBeginnings} />
    </div>
  );
}

export default LandingPage;
