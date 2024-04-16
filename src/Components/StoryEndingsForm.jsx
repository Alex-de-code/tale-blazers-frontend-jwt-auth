import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const StoryEndingsForm = () => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const { storyBeginningId } = useParams();
  //state for form inputs
  const [newOrUpdatedEnding, setNewOrUpdatedEnding] = useState({
    title: "",
    body: "",
    story_beginnings_id: storyBeginningId,
    user_id: user.id,
  });
  //state for setting storybeginning to display next to form view
  const [storyBeginning, setStoryBeginning] = useState({});

  const token = localStorage.getItem("token");

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

  useEffect(() => {
    console.log(storyBeginningId);

    if (storyBeginningId) {
      fetch(`${URL}/api/story_beginnings/${storyBeginningId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Response:", response);
          return response.json();
        })
        .then((storyBeginning) => {
          console.log("This is the Story Beginning:", storyBeginning.story);
          setStoryBeginning(storyBeginning.story);
          // return storyBeginning;
        })
        .catch((error) =>
          console.error("Error fetching storyBeginning data:", error)
        );
    }
  }, [storyBeginningId]);

  // console.log(newOrUpdatedEnding);
  return (
    <div className="h-auto">
      {/* <div className="bg-red-500 py-12">StoryEndingsForm</div> */}
      <div
        className="bg-slate-900"
        // style={{
        //   backgroundImage: `url(${`https://res.cloudinary.com/dvmczcg3f/image/upload/c_crop,ar_16:9/v1713153837/pattrern_7_ns9zmj.png`})`,
        //   backgroundSize: "cover",
        //   backgroundBlendMode: blur,
        // }}
      >
        <div className="px-4 py-12 text-center">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight mb-0 inline-block bg-slate-900 rounded-full px-1">
              Chart Your Own Course:
            </h1>
          </div>
          <div>
            <p className="text-lg md:text-xl text-white mb-0 inline-block bg-slate-900 rounded-full">
              Write Endings as Bold as the Story's Origins!
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 h-screen">
        <div className="col-span-1 md:col-span-3 bg-slate-900">
          <div className="flex justify-center p-10">
            <div className="bg-slate-600 w-96 md:w-124 rounded-3xl mt-10 mb-5 shadow-xl">
              <span className="flex flex-row bg-slate-700 rounded-t-3xl">
                <h2 className="text-2xl py-2 text-slate-200 font-semibold p-3 shadow rounded-t-3xl">
                  {storyBeginning.title}
                </h2>
              </span>
              <hr className="border-2 border-teal-500" />
              <p className="pb-4 pt-3 pl-4 pr-4 text-slate-200">
                {storyBeginning.body}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 bg-blue-500">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default StoryEndingsForm;
