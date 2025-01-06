import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPetsData } from "../api/route";

const petsContext = createContext(null);

let tempPetData = [];

function Context({ children }) {
  const [petData, setPetData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getPetsData();
      setPetData(res.data);
      tempPetData = res.data;
    })();
  }, []);

  return (
    // this wil provide the  data be global data
    <petsContext.Provider value={{ petData, setPetData, tempPetData }}>
      {children}
    </petsContext.Provider>
  );
}

// Define prop types for the component
Context.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;

// you can access the data of state from this function
export function PetsState() {
  const data = useContext(petsContext);
  return data;
}
