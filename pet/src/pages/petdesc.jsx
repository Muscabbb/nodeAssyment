import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PetsState } from "../Context/context";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";
import { getPetById, patchData } from "../api/route";

function PetDesc() {
  const [pet, setPet] = useState([]);
  const { id } = useParams();
  const { setPetData } = PetsState();
  useEffect(() => {
    (async () => {
      const res = await getPetById(id);
      setPet(res.data);
    })();
  }, [setPet, id]);

  const handleFavoriteClick = async () => {
    try {
      await patchData(id, { isFavorite: !pet.isFavorite });
      // Update local state
      setPet((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
      // Update global state
      setPetData((prevPets) =>
        prevPets.map((p) =>
          p._id === id ? { ...p, isFavorite: !p.isFavorite } : p
        )
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <main className="hero flex justify-center items-center ">
      <article className="flex flex-col md:flex-row items-center gap-2 md:gap-5 relative  shadow-lg my-28 bg-gray-100">
        <span
          className="absolute top-2 right-2 cursor-pointer z-30"
          onClick={handleFavoriteClick}
        >
          {pet.isFavorite ? (
            <MdOutlineFavorite className=" text-xl text-red-600 hover:text-red-400" />
          ) : (
            <GrFavorite className=" text-xl text-red-400 hover:text-red-600" />
          )}
        </span>
        <div className="img md:flex-1 w-full flex justify-center md:justify-start">
          <img
            src={pet.url}
            alt="Pet"
            className="h-[200px] md:h-[350px] w-4/5"
          />
        </div>

        <div className="p-2 space-y-4 flex-1">
          <h3 className=" font-bold">Pet Name: {pet.name}</h3>
          {pet.country_code && (
            <p className="leading-5">
              <span className="font-bold">Country Code: </span>{" "}
              {pet.country_code}
            </p>
          )}
          {pet.weight && (
            <p className="leading-5">
              <span className="font-bold">Weight: </span> {pet.weight} kg
            </p>
          )}
          {pet.bred_for && (
            <p className="leading-5">
              <span className="font-bold">Bred For: </span> {pet.bred_for}
            </p>
          )}
          {pet.description === "undefined" && (
            <p className="leading-5">
              <span className="font-bold">description: </span> {pet.description}
            </p>
          )}
          {pet.breed_group && (
            <p className="leading-5">
              <span className="font-bold">Breed Group: </span> {pet.breed_group}
            </p>
          )}
          {pet.life_span && (
            <p className="leading-5">
              <span className="font-bold">Life Span: </span> {pet.life_span}
            </p>
          )}
          {pet.temperament && (
            <p className="leading-5">
              <span className="font-bold">Temperament: </span> {pet.temperament}
            </p>
          )}
          {pet.origin && (
            <p className="leading-5">
              <span className="font-bold">Origin: </span> {pet.origin}
            </p>
          )}
        </div>
      </article>
    </main>
  );
}

export default PetDesc;
