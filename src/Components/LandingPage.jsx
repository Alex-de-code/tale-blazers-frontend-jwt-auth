import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StoryBeginningsIndex from "./StoryBeginningsIndex";
import { CirclePlus, Flame, Plus, SquarePlus } from "lucide-react";

function LandingPage({ storyBeginnings }) {
  return (
    <>
      <div className="bg-slate-900">
        <div className=" py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Journey Ahead:
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-white">
            Blaze Trails through the Boundless Realms of
            <div className="flex items-center justify-center mt-4">
              <Flame className=" text-teal-400" size={48} />
              <h2 className="text-4xl mt-1">
                <span className="text-teal-400">Tale</span>{" "}
                <span className="text-orange-500">Blazers</span>
              </h2>
            </div>
          </h2>
        </div>
        <button className="flex justify-center text-slate-50 w-5/6 rounded-xl mx-auto md:w-1/3 mb-10 text-2xl bg-slate-800 border-2 border-orange-500 py-2 hover:scale-110 transition-transform duration-300">
          Contribute Your Story!
        </button>
        <StoryBeginningsIndex storyBeginnings={storyBeginnings} />
      </div>
    </>
  );
}

export default LandingPage;
