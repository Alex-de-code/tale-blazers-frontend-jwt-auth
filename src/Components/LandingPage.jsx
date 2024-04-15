import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StoryBeginningsIndex from "./StoryBeginningsIndex";
import { Flame } from "lucide-react";

function LandingPage({ storyBeginnings }) {
  return (
    <div className="bg-slate-900">
      {/* <h1 className="text-3xl text-center py-5 bg-slate-400">Landing Page</h1> */}
      <div class=" py-20 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
          Journey Ahead:
        </h1>
        <h2 class="text-2xl md:text-4xl font-semibold text-white">
          Blaze Trails through the Boundless Realms of
          <div className="flex items-center justify-center mt-4">
            <Flame className=" text-teal-400" size={48} />
            <h2 className="text-4xl mt-1">Tale Blazers</h2>
          </div>
        </h2>
      </div>
      <StoryBeginningsIndex storyBeginnings={storyBeginnings} />
    </div>
  );
}

export default LandingPage;
