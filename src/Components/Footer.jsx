import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div className="bg-black px-10 py-10">
        <div className="flex flex-row justify-between items-center">
          <Link to={"/"}>
            <div className="lg:pr-16 font-bold text-2xl text-white pr-10">
              TB
            </div>
          </Link>
          <Link to={"/aboutthedevs"}>
            <div className="hover:text-orange-500 text-white">About</div>
          </Link>
          <Link
            to={
              "https://github.com/Alex-de-code/tale-blazers-frontend-jwt-auth"
            }
            target="_blank"
            className=""
          >
            <BsGithub size={24} className=" hover:text-teal-400 text-white" />
          </Link>
          <span className=" text-white">&#169;2024 Tale Blazers Inc.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
