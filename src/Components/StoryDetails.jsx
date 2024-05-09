import {
  AlignCenter,
  ArrowBigUp,
  ChevronUp,
  ChevronsUp,
  CirclePlus,
  CircleX,
  Flag,
  Flame,
  FlameKindling,
  Info,
  MessageSquare,
  MoveLeft,
  MoveRight,
  PencilLine,
  TentTree,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const StoryDetails = () => {
  const [singleStoryBeginning, setSingleStoryBeginning] = useState(null);

  // this usestate if for the modal with storyBeginning info
  const [openModal, setOpenModal] = useState(false);

  // ___________________________________states

  // this usestate is where we house our array of storyendings for our specific storybeginning id
  const [allStoryEndingsForSingleStory, setAllStoryEndingsForSingleStory] =
    useState([]);

  // this usestate sets index of storyEndings and for carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // const [isHovered, setIsHovered] = useState(false);

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

  // _____________________________________

  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const navigate = useNavigate();
  // const storyEndingId = allStoryEndingsForSingleStory[currentIndex]?.id;

  const navigateToNewStoryEndingFormCreate = (storyBeginningId) => {
    navigate(`/storyendings_form/${storyBeginningId}/new`);
  };

  const navigateToNewStoryEndingFormEdit = (storyEndingId) => {
    navigate(
      `/storyendings_form/${singleStoryBeginning.id}/edit/${storyEndingId}`
    );
  };

  const navigateToStoryEndingComments = (StoryEndingId) => {
    navigate(`storyendings_comments/${StoryEndingId}`);
  };

  const [storyCreator, setStoryCreator] = useState({
    username: "",
    profile_picture: "",
    created_at: "",
    bio: "",
  });

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

  // _____________________ CODE TALK HERE ________________________________

  const goToPreviousEnding = () => {
    setCurrentIndex(
      (prevIndex) =>
        //check if previous index is 0, if it is set currentIndex to the length of allstoryEndings minus one
        prevIndex === 0
          ? allStoryEndingsForSingleStory.length - 1
          : prevIndex - 1
      // else decrease currentIndex by one
    );
  };

  const goToNextEnding = () => {
    setCurrentIndex(
      (prevIndex) =>
        //check if previous index is equal to length of allStoryendings minus one, if yes set CurrenIndex to zero
        prevIndex === allStoryEndingsForSingleStory.length - 1
          ? 0
          : prevIndex + 1
      //else increase currentindex by 1
    );
  };

  // __________________________________________________________________________________

  const { id } = useParams();

  const handleDelete = (storyEndingId) => {
    if (allStoryEndingsForSingleStory.length > 0) {
      const token = localStorage.getItem("token");
      console.log("deleteing");
      if (token) {
        fetch(`${URL}/api/story_endings/single/${storyEndingId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              // If deletion is successful, you might want to refresh the list of story endings
              // You can either refetch the data or remove the deleted story ending from the state
              const updatedEndings = allStoryEndingsForSingleStory.filter(
                (ending) => ending.id !== storyEndingId
              );
              setAllStoryEndingsForSingleStory(updatedEndings);
              setCurrentIndex(currentIndex - 1);
            } else {
              throw new Error("Failed to delete story ending");
            }
          })
          .catch((error) =>
            console.error("Error deleting story ending:", error)
          );
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // this currently fetches all story endings, but what we actually want is to only fetch the story endings based on a story_beginning ID
      // this is set up in the backend but we need to pass the story_beginning Id of a clicked story_beginning to this view
      fetch(`${URL}/api/story_beginnings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((storyBeginning) => {
          // console.log("We did it!", storyBeginning.creator);
          setSingleStoryBeginning(storyBeginning.story);
          setStoryCreator(storyBeginning.creator);
          return storyBeginning;
        })
        .then((storyBeginning) => {
          //passing story beginning object
          fetch(`${URL}/api/story_endings/${storyBeginning.story.id}`)
            .then((response) => response.json())
            .then((storyEndings) => {
              setAllStoryEndingsForSingleStory(storyEndings);
            });
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="bg-slate-900 flex-grow"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dvmczcg3f/image/upload/c_crop,ar_16:9/v1713153837/pattrern_7_ns9zmj.png'), url('https://res.cloudinary.com/dvmczcg3f/image/upload/c_crop,ar_16:9/v1713153837/pattrern_7_ns9zmj.png'), url('https://res.cloudinary.com/dvmczcg3f/image/upload/c_crop,ar_16:9/e_mirror/v1713153837/pattrern_7_ns9zmj.png')`,
          backgroundRepeat: "no-repeat, repeat-y",
          backgroundSize: "100%, 100%",
          backgroundPosition: "center top, center bottom",
        }}
      >
        {singleStoryBeginning && (
          <div className="flex justify-center ">
            <div className="bg-slate-600/95 w-96 lg:w-192 rounded-t-3xl mt-36 mb-5 shadow-xl">
              <span className="flex flex-row bg-slate-700 rounded-t-3xl">
                <h2 className="text-2xl py-2 text-slate-200 font-semibold p-3 break-words">
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
                  <button
                    className=""
                    onClick={() => navigateToNewStoryEndingFormCreate(id)}
                  >
                    <CirclePlus
                      size={36}
                      className="bg-teal-400 hover:bg-slate-300 rounded-full p-1"
                    />
                  </button>
                </div>
              </span>
              <hr className="border-2 border-teal-500" />
              <p className="pb-4 pt-3 pl-4 pr-4 text-slate-200 break-words">
                {singleStoryBeginning.body}
              </p>
            </div>
          </div>
        )}
        {/* <div className="flex justify-center">
          <hr class="border-transparent border-2 ring-8 ring-teal-400/70 w-96 lg:w-188" />
        </div> */}
        {openModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/40 bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-black/40 p-8 rounded-xl border-2 border-teal-400 w-100">
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-1 right-1 text-gray-400 hover:text-teal-400 font-semibold p-2 rounded-full inline-flex items-center"
              >
                <CircleX size={36} />
              </button>
              <h3 className="text-3xl font-semibold mb-2 text-slate-50 pt-2 text-balance">
                {singleStoryBeginning.title}
              </h3>
              <p className="text-xl text-slate-50 italic mb-3">
                {formatDate(singleStoryBeginning.created_at)}
              </p>
              <p className="inline-block rounded-full mb-3 items-center text-xl bg-slate-200 py-1 px-2">
                {singleStoryBeginning.genre}
              </p>
              <p className="text-xl text-slate-50 mb-3 text-balance">
                {singleStoryBeginning.description}
              </p>
              <div className="flex flex-row">
                <div className="text-xl text-slate-50 flex items-center mr-5 text-balance">
                  Blazer:{" "}
                </div>
                <span className="flex flex-row bg-black/70 rounded-full items-center pr-3">
                  <img
                    src={storyCreator.profile_picture}
                    alt="profile img"
                    className=" w-14 rounded-full"
                  />
                  <h2 className="flex items-center ml-3 text-slate-100 text-2xl pr-14">
                    {storyCreator.username[0].toUpperCase()}
                    {storyCreator.username.slice(1).toLowerCase()}
                  </h2>
                </span>
              </div>
            </div>
          </div>
        )}
        {allStoryEndingsForSingleStory.length > 0 && (
          <div>
            <div className="flex justify-center mt-5">
              <div
                className="bg-slate-600/95 w-96 lg:w-192 shadow-xl rounded-b-3xl"
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-row bg-slate-600">
                  <h2 className="text-2xl py-2 text-slate-200 font-semibold p-3 text-balance">
                    {allStoryEndingsForSingleStory[currentIndex]?.title}
                  </h2>
                  {user.id !==
                    allStoryEndingsForSingleStory[currentIndex]?.user_id && (
                    <div className="ml-auto mr-2 flex items-center">
                      <button className=" hover:bg-slate-300 text-red-400 hover:text-red-600 bg-slate-700 font-semibold p-1 m-1 rounded-full flex items-center ml-auto">
                        <Flag size={26} className="" />
                      </button>
                    </div>
                  )}
                  {user &&
                    user.id ===
                      allStoryEndingsForSingleStory[currentIndex]?.user_id && (
                      <div className="ml-auto mr-2 flex items-center">
                        <button
                          onClick={() =>
                            navigateToNewStoryEndingFormEdit(
                              allStoryEndingsForSingleStory[currentIndex]?.id
                            )
                          }
                          className="bg-teal-400 hover:bg-slate-300 font-semibold p-1 m-1 rounded-full inline-flex items-center ml-auto mr-3"
                        >
                          <PencilLine size={26} />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(
                              allStoryEndingsForSingleStory[currentIndex]?.id
                            )
                          }
                          className="bg-slate-900 text-teal-400 hover:bg-slate-300 hover:text-red-600 font-semibold p-1 m-1 rounded-full inline-flex items-center"
                        >
                          <Trash2 size={26} />
                        </button>
                      </div>
                    )}
                </div>
                <hr className="border-2 border-slate-700" />
                <div className="pb-4 pt-3 pl-4 pr-4 text-slate-200">
                  {/* <div className="flex flex-row py-1 justify-between">
                    {isHovered && (
                      <>
                        <button
                          onClick={goToPreviousEnding}
                          className="mx-2 text-white hover:animate-ping"
                        >
                          <MoveLeft size={48} />
                        </button>
                        <button
                          onClick={goToNextEnding}
                          className="mx-2 text-white hover:animate-ping"
                        >
                          <MoveRight size={48} />
                        </button>
                      </>
                    )}
                  </div> */}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: allStoryEndingsForSingleStory[currentIndex]?.body,
                    }}
                    className="text-balance"
                  ></span>
                  <div className="flex justify-evenly items-center mt-4">
                    <button
                      onClick={goToPreviousEnding}
                      className=" text-slate-200 hover:animate-ping"
                    >
                      <MoveLeft size={42} />
                    </button>
                    {/* <div className="flex justify-evenly items-center rounded-full w-3/5  "> */}
                    {/* <button className="inline-block  hover:bg-slate-500 p-1 rounded-full">
                        <ThumbsUp size={24} />
                      </button> */}
                    {/* <button className="inline-block hover:bg-slate-500 rounded-full">
                        <ArrowBigUp size={36} />
                      </button> */}
                    <button className="inline-block  hover:bg-slate-500 p-1 rounded-full">
                      <Flame size={28} className="" />
                    </button>
                    <button
                      onClick={() =>
                        navigateToStoryEndingComments(
                          allStoryEndingsForSingleStory[currentIndex]?.id
                        )
                      }
                      className="inline-block hover:bg-slate-500 p-1 rounded-full"
                    >
                      <MessageSquare size={28} className="" />
                    </button>
                    {/* </div> */}
                    <button
                      onClick={goToNextEnding}
                      className=" text-slate-200 hover:animate-ping"
                    >
                      <MoveRight size={42} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white text-center mt-2 mb-36">
              (Entry {currentIndex + 1} of{" "}
              {allStoryEndingsForSingleStory.length})
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDetails;
