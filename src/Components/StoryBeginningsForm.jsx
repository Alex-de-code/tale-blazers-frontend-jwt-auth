import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import ReactModal from "react-modal";
import { Ban, CircleX } from "lucide-react";

const URL = import.meta.env.VITE_BASE_URL;

// Set the app element for react-modal
ReactModal.setAppElement("#root");

const StoryBeginningsForm = ({ setStoryBeginnings }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  //state for form inputs
  const [newBeginning, SetNewBeginning] = useState({
    user_id: user.id,
    title: "",
    genre: "",
    description: "",
    body: "",
  });

  const handleTextChange = (event) => {
    SetNewBeginning({ ...newBeginning, [event.target.id]: event.target.value });
  };

  const addStoryBeginning = () => {
    fetch(`${URL}/api/story_beginnings`, {
      method: "POST",
      body: JSON.stringify(newBeginning),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((storyBeginning) => {
        // Update the story beginnings state with the new story beginning
        setStoryBeginnings((prevStoryBeginnings) => [
          ...prevStoryBeginnings,
          storyBeginning,
        ]);
        navigate(`/storydetails/${storyBeginning.id}`);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("submit was clicked");
    // addStoryBeginning();
    setIsModalOpen(true);
  };

  const handleConfirmation = () => {
    addStoryBeginning();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="col-span-1 md:col-span-3 bg-slate-900">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center bg-center text-orange-500 pt-24">
          Start Your Legacy!
        </h1>
        <div className="flex justify-center mt-10">
          <form
            onSubmit={handleSubmit}
            className="w-124 md:w-3/4 grid gap-4 bg-white pt-8 pb-12 mb-48 rounded-3xl shadow-2xl"
          >
            <h2 className="text-2xl text-center font-semibold text-black">
              Create Your Beginning
            </h2>
            <label htmlFor="title" className="grid grid-row-2">
              <span className="ml-16 ">Title:</span>
              <div className="flex justify-center">
                <input
                  id="title"
                  name="title"
                  value={newBeginning.title}
                  type="text"
                  placeholder="name it"
                  onChange={handleTextChange}
                  className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3 mt-3 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </label>
            <label htmlFor="genre" className="grid grid-row-2">
              <span className="ml-16">Genre:</span>
              <div className="flex justify-center">
                <select
                  id="genre"
                  name="genre"
                  value={newBeginning.genre}
                  onChange={handleTextChange}
                  className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3 mt-3 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select Genre</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Crime">Crime</option>
                  <option value="Drama">Drama</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Historical Fiction">Historical Fiction</option>
                  <option value="Horror">Horror</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Magical Realism">Magical Realism</option>
                  <option value="Paranormal">Paranormal</option>
                  <option value="Supernatural">Supernatural</option>
                  <option value="Urban Fantasy">Urban Fantasy</option>
                  <option value="Slice of Life">Slice of Life</option>
                  <option value="Literary Fiction">Literary Fiction</option>
                  <option value="Experimental">Experimental</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </label>
            <label htmlFor="description" className="grid grid-row-2">
              <span className="ml-16">Description:</span>
              <div className="flex justify-center">
                <input
                  id="description"
                  name="description"
                  value={newBeginning.description}
                  type="text"
                  placeholder="just a taste"
                  onChange={handleTextChange}
                  className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3 mt-3 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </label>
            <label htmlFor="body" className="grid grid-row-2">
              <span className="ml-16">Body:</span>
              <div className="flex items-center justify-center">
                <textarea
                  id="body"
                  name="body"
                  type="text"
                  value={newBeginning.body}
                  placeholder="craft the tale"
                  onChange={handleTextChange}
                  // className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3 ml-4 mt-3"
                  required
                  className=" mx-10 rounded shadow-md w-3/4 h-32 py-3 pl-3 mt-3 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>
            </label>
            <div className="flex justify-center">
              <button className="bg-teal-400 hover:bg-slate-200 rounded px-2 py-3 shadow-md w-3/4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Confirmation Modal"
        // className={"bg-red-500"}
        className={
          "fixed inset-0 flex justify-center items-center bg-black/40 bg-opacity-50 backdrop-blur-sm"
        }
      >
        <div className="relative bg-black/60 p-8 rounded-xl border-2 border-red-500 w-100">
          <button
            onClick={() => handleCloseModal()}
            className="absolute top-1 right-1 text-gray-400 hover:text-white font-semibold p-2 rounded-full inline-flex items-center"
          >
            <CircleX size={48} />
          </button>
          <h2 className="text-white text-lg p-3">
            Are you certain about submitting? Once submitted, you won't be able
            to modify or delete the story, affecting other contributing users.
            Take a moment to review meticulously and ensure your story aligns
            with your intentions. When prepared, click 'Submit' to publish or
            'Cancel' to return to the story form.
          </h2>
          <div className="flex items-center justify-around">
            <button
              onClick={handleConfirmation}
              className="text-2xl text-green-400 hover:text-white"
            >
              Submit
            </button>
            <button
              onClick={handleCloseModal}
              className="text-2xl text-red-500 hover:text-white"
            >
              Cancel
            </button>
            {/* <Ban size={56} /> */}
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default StoryBeginningsForm;
