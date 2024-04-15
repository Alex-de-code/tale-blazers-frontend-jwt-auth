import { CirclePlus, CircleX, Info, MoveLeft, MoveRight } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

const StoryDetails = () => {
  const [singleStoryBeginning, setSingleStoryBeginning] = useState([]);
  const [allStoryEndingsForSingleStory, setAllStoryEndingsForSingleStory] =
    useState([]);
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  // this usestate if for the modal with storyBeginning info
  const [openModal, setOpenModal] = useState(false);
  // this usestate sets index of storyEndings and for carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return `Created on ${formattedDate}`;
  };

  const handleModal = () => {
    setOpenModal(true);
    console.log(openModal);
  };

  const goToPreviousEnding = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allStoryEndingsForSingleStory.length - 1 : prevIndex - 1
    );
  };

  const goToNextEnding = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allStoryEndingsForSingleStory.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // this currently fetches all story endings, but what we actually want is to only fetch the story endings based on a story_beginning ID
      // this is set up in the backend but we need to pass the story_beginning Id of a clicked story_beginning to this view
      fetch(`${API}/api/story_beginnings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((storyBeginning) => {
          setSingleStoryBeginning(storyBeginning);
          return storyBeginning;
        })
        .then((storyBeginning) => {
          //passing story beginning object
          fetch(`${API}/api/story_endings/${storyBeginning.id}`)
            .then((response) => response.json())
            .then((storyEndings) => {
              setAllStoryEndingsForSingleStory(storyEndings);
            });
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, []);

  return (
    <div
      className="bg-slate-900 h-screen"
      // style={{
      //   backgroundImage: `url(${`https://res.cloudinary.com/dvmczcg3f/image/upload/c_crop,ar_16:9/v1712988101/pattern_ptsyaw.png`})`,
      //   backgroundSize: "cover",
      //   backgroundBlendMode: blur,
      // }}
    >
      {/* {console.log(singleStoryBeginning)}
      {console.log(allStoryEndingsForSingleStory)} */}
      <div className="bg-black text-white p-5 text-center">
        Story Details View
      </div>
      <div className="flex justify-center pt-10">
        <div className="bg-slate-600 w-96 lg:w-192 rounded-t-3xl mt-10 mb-5 shadow-xl">
          <span className="flex flex-row bg-slate-700 rounded-t-3xl">
            <h2 className="text-2xl py-2 text-slate-200 font-semibold p-3 shadow rounded-t-3xl">
              {singleStoryBeginning.title}
            </h2>
            <div className="ml-auto mr-3 flex items-center">
              <button className="ml-auto mr-3">
                <Info
                  size={36}
                  className="bg-slate-900 text-teal-400 hover:bg-slate-300 hover:text-slate-900 rounded-full p-1"
                  onClick={handleModal}
                />
              </button>
              <button className="">
                <CirclePlus
                  size={36}
                  className="bg-teal-400 hover:bg-slate-300 rounded-full p-1"
                />
              </button>
            </div>
          </span>
          <hr className="border-2 border-teal-500" />
          <p className="pb-4 pt-3 pl-4 pr-4 text-slate-200">
            {singleStoryBeginning.body}
          </p>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-black/40 p-8 rounded-xl border-2 border-teal-400 w-100">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-1 right-1 text-gray-400 hover:text-teal-400 font-semibold p-2 rounded-full inline-flex items-center"
            >
              <CircleX size={36} />
            </button>
            <h3 className="text-3xl font-semibold mb-2 text-slate-50 pt-2">
              {singleStoryBeginning.title}
            </h3>
            <p className="text-xl text-slate-50 italic mb-3">
              {formatDate(singleStoryBeginning.created_at)}
            </p>
            <p className="inline-block rounded-full mb-3 items-center text-xl bg-slate-200 py-1 px-2">
              {singleStoryBeginning.genre}
            </p>
            <p className="text-xl text-slate-50 mb-3">
              {singleStoryBeginning.description}
            </p>
            <div className="flex flex-row">
              <div className="text-xl text-slate-50 flex items-center mr-5">
                Written by:{" "}
              </div>
              <span className="flex flex-row bg-black/70 rounded-full items-center pr-3">
                <img
                  src={user.profile_picture}
                  alt="profile img"
                  className=" w-12 rounded-full"
                />
                <h2 className="flex items-center ml-3 text-slate-100 text-2xl">
                  {user.username[0].toUpperCase()}
                  {user.username.slice(1).toLowerCase()}
                </h2>
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center my-5">
        <button
          onClick={goToPreviousEnding}
          className="mx-2 text-white py-2 px-4 hover:animate-ping"
        >
          <MoveLeft size={48} />
        </button>
        <div className="bg-slate-600 w-96 lg:w-192 shadow-xl rounded-3xl">
          <h2 className="text-2xl bg-slate-600 py-2 text-slate-200 font-semibold p-3 shadow">
            {allStoryEndingsForSingleStory[currentIndex]?.title}
          </h2>
          <hr className="border-2 border-slate-700" />
          <p className="pb-4 pt-3 pl-4 pr-4 text-slate-200">
            <span
              dangerouslySetInnerHTML={{
                __html: allStoryEndingsForSingleStory[currentIndex]?.body,
              }}
            ></span>
          </p>
        </div>
        <button
          onClick={goToNextEnding}
          className="mx-2 text-white py-auto px-4 hover:animate-ping"
        >
          <MoveRight size={48} />
        </button>
      </div>
      <div className="text-white text-center">
        (Entry {currentIndex + 1} of {allStoryEndingsForSingleStory.length})
      </div>
    </div>
  );
};

export default StoryDetails;
