import Hero from "../Components/hero";
import Pet from "../Components/pet";
import SearchPet from "../Components/searchpet";
import { PetsState } from "../Context/context";

export default function Landing() {
  const { petData, setPetData, tempPetData } = PetsState();

  const searchPetName = (name) => {
    // Reset to original data if search is empty
    if (!name.trim()) {
      setPetData(tempPetData);
      return;
    }

    // Filter pets based on search term
    const searchTerm = name.toLowerCase().trim();
    const filteredPets = tempPetData.filter((pet) =>
      pet.name.toLowerCase().includes(searchTerm)
    );

    setPetData(filteredPets);
  };

  return (
    <main className="min-h-screen w-full">
      <Hero />

      <section className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center my-10 capitalize">
          All Pets
        </h1>

        <SearchPet searchPetName={searchPetName} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {petData.map((pet) => (
            <Pet key={pet._id} petData={pet} />
          ))}
        </div>
      </section>
    </main>
  );
}
