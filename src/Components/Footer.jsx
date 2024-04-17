import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div className="bg-black px-10 py-10">
        <div className="flex flex-row justify-between">
          <Link to={"/"}>
            <div className="lg:pr-16 font-bold text-2xl text-white inline-block pt-3 pr-10">
              TB
            </div>
          </Link>
          <div className="text-white flex flex-row  pt-5 ">
            <Link to={"/aboutthedevs"}>
              <div className="hover:text-blue-400 lg:mr-10 ">About</div>
            </Link>
            <Link
              // to={"https://github.com/MichaelARestrepoross/CoursQuest-Backend"}
              target="_blank"
            >
              <BsGithub className="lg:mr-16 mr-3 w-5 h-5 mt-1 ml-10 lg:ml-48 hover:text-purple-400" />
            </Link>
          </div>
          <span className="flex flex-row pt-6 pb-4 text-white text-sm">
            &#169;2024 Tale Blazers Inc.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
