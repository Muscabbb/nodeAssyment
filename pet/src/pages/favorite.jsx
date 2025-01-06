import { PetsState } from "../Context/context";

function Favorite() {
  const { petData } = PetsState();
  const favoritePets = petData.filter((pet) => pet.isFavorite);

  if (favoritePets.length > 0) {
    return (
      <main className="hero">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">Pet Image</th>
                <th className="py-2 px-4 border-b">Pet Name</th>
                <th className="py-2 px-4 border-b">Pet Weight</th>
              </tr>
            </thead>
            <tbody>
              {favoritePets.map(
                (pet, index) =>
                  pet.isFavorite && (
                    <tr key={index} className="text-center">
                      <td className="py-2 px-4 border-b">
                        <img
                          src={pet.url}
                          alt={pet.name}
                          className="mx-auto w-14 h-14"
                        />
                      </td>
                      <td className="py-2 px-4 border-b">{pet.name}</td>
                      <td className="py-2 px-4 border-b">{pet.weight}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </main>
    );
  } else {
    return (
      <main className="hero flex justify-center items-center">
        <h2 className="font-semibold text-3xl capitalize">
          no selected favorites
        </h2>
      </main>
    );
  }
}

export default Favorite;
