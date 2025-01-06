import { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import PropTypes from "prop-types";

function SearchPet({ searchPetName }) {
  const inputRef = useRef();
  return (
    <div className="search background-el cursor-pointer w-80 mx-auto mb-14  rounded flex items-center text-sm md:text-lg lg:text-xl shadow-md">
      <span
        className="search-menu p-3 rounded order-3"
        onClick={() => inputRef.current?.focus()}
      >
        <CiSearch />
      </span>
      <input
        ref={inputRef}
        type="text"
        className="pl-2 bg-transparent w-full focus:outline-none"
        placeholder="Search for a Pet Name..."
        onChange={() => searchPetName(inputRef.current.value)}
      />
    </div>
  );
}

// Define prop types for the component
SearchPet.propTypes = {
  searchPetName: PropTypes.func.isRequired,
};

export default SearchPet;
