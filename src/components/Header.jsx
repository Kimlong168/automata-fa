import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <div className="flex justify-between gap-3 items-center p-6 md:px-12 shadow-xl">
      <Link to="/">
        <div>
          <img className="h-[45px]" src={logo} alt="cadt" />
        </div>
      </Link>
      <div>
        <Link to="/about">
          <h1 className="font-bold text-xl text-blue-950 uppercase">
            Automata
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
