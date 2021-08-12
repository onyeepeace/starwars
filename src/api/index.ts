import axios from "axios";

export type ICharacters = {
  name: string;
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  skin_color: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
};

export const characters = (name: string) => {
  const url = `http://swapi.dev/api/people/?search=${name}`;
  const fetchResult = axios
    .get(url)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Something went wrong");
      }
      return res.data.results;
    })
    .catch((error) => error);
  return fetchResult;
};
