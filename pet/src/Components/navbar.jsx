import { Link } from "react-router-dom";
import { PetsState } from "../Context/context";

function Navbar() {
  const { petData } = PetsState();
  const isFavorite = petData.find((pet) => pet.isFavorite);
  return (
    <nav className="container flex mx-auto py-4 justify-between items-center px-2">
      <Link to={""}>
        <div className="logo flex items-center">
          <img
            src={"../../public/img/logo.svg"}
            alt="log"
            className="w-8 md:w-10"
          />
          <h2 className=" font-bold uppercase text-lg md:text-2xl">pet guru</h2>
        </div>
      </Link>

      <Link to={"favorite"}>
        <p className=" relative text-lg font-semibold">
          {isFavorite && <span className="favorite-notification"></span>}
          favorites
        </p>
      </Link>
    </nav>
  );
}

export default Navbar;
