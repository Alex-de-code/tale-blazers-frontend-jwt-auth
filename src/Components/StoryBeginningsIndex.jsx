import React from "react";
import { Link, Navigate } from "react-router-dom";

const StoryBeginnings = ({ storyBeginnings }) => {
  return (
    <div className="">
      <div className="pb-24">
        {storyBeginnings.map(
          ({ id, user_id, title, genre, description, body, created_at }) => (
            <div key={id}>
              <Link to={`/storydetails/${id}`}>
                <div className="shadow-2xl mb-10 w-5/6 mx-auto md:w-1/3 hover:scale-110 transition-transform duration-300">
                  <div className="flex justify-between bg-slate-800 shadow">
                    <div className="text-xl font-semibold text-slate-50 p-2 pl-3 pt-3">
                      {title}
                    </div>
                    <div className=" inline-block bg-slate-100 px-2 mb-2 mt-2 mr-3 py-1 italic">
                      {genre}
                    </div>
                  </div>
                  <div className="text-center shadow p-3 bg-slate-700 text-slate-100">
                    <span className="line-clamp-1">{description}</span>
                  </div>
                </div>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StoryBeginnings;
