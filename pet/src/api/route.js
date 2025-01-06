export async function getPetsData() {
  const data = await fetch("http://localhost:5000/api/pets");

  return await data.json();
}

export async function getPetById(id) {
  const data = await fetch(`http://localhost:5000/api/pets/${id}`);

  return await data.json();
}

export async function patchData(id, bodyData) {
  const data = await fetch(`http://localhost:5000/api/pets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  return await data.json();
}
