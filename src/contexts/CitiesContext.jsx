import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:9000";
//1. ftiaxnw to context api
const CitiesContext = createContext();

//2. metaferw olo to logic state mesa sto neo component
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

//3. fiaxnw to custom hook
const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside the Cities Provider");
  return context;
};

export { CitiesProvider, useCities };
