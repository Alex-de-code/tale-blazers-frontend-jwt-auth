import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StoryBeginningsIndex from "./StoryBeginningsIndex";
import { Flame, Search } from "lucide-react";

function LandingPage({ storyBeginnings }) {
  const navigate = useNavigate();

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
        <div className="flex items-center w-5/6 mx-auto md:w-1/2 mb-5">
          <div className="flex items-center flex-grow rounded-xl focus-within:shadow-lg border-2 border-slate-50 hover:border-teal-400">
            <div className="mr-3 ">
              <Search className="h-14 w-7 text-slate-100 ml-3" />
            </div>
            <input
              className="h-full flex-grow outline-none text-xl text-white bg-transparent"
              type="text"
              id="search"
              placeholder="Discover a tale..."
              // value={input}
              // onChange={handleSearchChange}
            />
          </div>
        </div>
        <button
          onClick={() => navigate(`/storybeginnings_form/new`)}
          className="flex justify-center text-slate-50 w-5/6 rounded-xl mx-auto md:w-2/5 mb-20 text-2xl bg-slate-800 border-2 border-orange-500 py-2 hover:scale-110 transition-transform duration-300"
        >
          Contribute Your Story!
        </button>
        <StoryBeginningsIndex storyBeginnings={storyBeginnings} />
      </div>
    </>
  );
}

export default LandingPage;
