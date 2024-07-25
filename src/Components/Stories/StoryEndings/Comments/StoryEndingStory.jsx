import React from "react";

const StoryEndingStory = ({ storyEnding }) => {
  return (
    <>
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
    </>
  );
};

export default StoryEndingStory;
