import { FC, useState, useEffect } from "react";
import resultStyles from "./Result.module.css";
import { ICharacters } from "./api/index";

interface IResult {
  data: ICharacters[];
}

interface IHomeworld {
  name: string;
}

interface IFilms {
  title: string;
}

interface ISpecies {
  name: string;
}

interface IStarships {
  name: string;
}

interface IVehicles {
  name: string;
}

const Result: FC<IResult> = ({ data }) => {
  const [isResultLoading, setIsResultLoading] = useState<boolean>(false);

  const [film, setFilm] = useState<IFilms[]>([]);
  const [isFilmLoading, setIsFilmLoading] = useState<boolean>(false);

  const [homeworld, setHomeworld] = useState<IHomeworld>({} as IHomeworld);
  const [isHomeworldLoading, setIsHomeworldLoading] = useState<boolean>(false);

  const [specie, setSpecie] = useState<ISpecies[]>([]);
  const [isSpecieLoading, setIsSpecieLoading] = useState<boolean>(false);

  const [starship, setStarship] = useState<IStarships[]>([]);
  const [isStarshipLoading, setIsStarshipLoading] = useState<boolean>(false);

  const [vehicle, setVehicle] = useState<IVehicles[]>([]);
  const [isVehicleLoading, setIsVehicleLoading] = useState<boolean>(false);

  const fetchNestedData = () => {
    try {
      data.map(async (dataResult) => {
        const response = await fetch(dataResult.homeworld);
        const result = await response.json();
        setHomeworld(result);
        setIsHomeworldLoading(true);

        Promise.all(
          dataResult.species.map((specieUrl: RequestInfo) =>
            fetch(specieUrl).then((res) => res.json())
          )
        ).then((oneSpecie) => {
          setSpecie(oneSpecie);
          setIsSpecieLoading(true);
        });

        Promise.all(
          dataResult.films.map((filmUrl: RequestInfo) =>
            fetch(filmUrl).then((res) => res.json())
          )
        ).then((oneFilm) => {
          setFilm(oneFilm);
          setIsFilmLoading(true);
        });

        Promise.all(
          dataResult.starships.map((starshipUrl: RequestInfo) =>
            fetch(starshipUrl).then((res) => res.json())
          )
        ).then((oneStarship) => {
          setStarship(oneStarship);
          setIsStarshipLoading(true);
        });

        Promise.all(
          dataResult.vehicles.map((vehicleUrl: RequestInfo) =>
            fetch(vehicleUrl).then((res) => res.json())
          )
        ).then((oneVehicle) => {
          setVehicle(oneVehicle);
          setIsVehicleLoading(true);
        });
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setIsResultLoading(true);
    fetchNestedData();
  }, [data]);

  return (
    <div>
      <div className={resultStyles.information}>
        {isResultLoading
          ? data.map((item, index) => (
              <div className={resultStyles.details} key={index}>
                <div className={resultStyles.singleDetails}>
                  <h4 className={resultStyles.heading}>
                    <p>name</p> {item.name}
                  </h4>
                  <h4 className={resultStyles.heading}>
                    <p>birth year</p>
                    {item.birth_year}
                  </h4>
                  <h4 className={resultStyles.heading}>
                    <p>created</p>
                    {new Date(item.created).toLocaleDateString("en-GB")}
                  </h4>
                  <h4 className={resultStyles.heading}>
                    <p>edited</p>
                    {new Date(item.edited).toLocaleDateString("en-GB")}
                  </h4>
                  <h4 className={resultStyles.heading}>
                    <p>eye color</p> {item.eye_color}
                  </h4>

                  <h4 className={resultStyles.heading}>
                    <p>gender</p> {item.gender}
                  </h4>
                  <h4 className={resultStyles.heading}>
                    <p>hair color</p> {item.hair_color}
                  </h4>
                  <h4 className={resultStyles.heading}>
                    <p>height</p> {item.height}
                  </h4>
                  {isHomeworldLoading ? (
                    <h4 className={resultStyles.heading}>
                      <p>homeworld</p> {homeworld.name}
                    </h4>
                  ) : (
                    "Loading..."
                  )}
                  <h4 className={resultStyles.heading}>
                    <p>mass</p> {item.mass}
                  </h4>
                  <h4 className={resultStyles.heading}>
                    <p>skin color</p> {item.skin_color}
                  </h4>
                </div>

                <div className={resultStyles.collections}>
                  <div className={resultStyles.list}>
                    <h3>Films</h3>
                    {film.length >= 1 ? (
                      isFilmLoading ? (
                        film.map((aFilm, index) => (
                          <ul className="" key={index}>
                            <li className={resultStyles.listItem}>
                              - {aFilm.title}
                            </li>
                          </ul>
                        ))
                      ) : (
                        "Loading..."
                      )
                    ) : (
                      <h4 className={resultStyles.listItem}>
                        No film available
                      </h4>
                    )}
                  </div>
                  <div className={resultStyles.list}>
                    <h3>Species</h3>
                    {specie.length >= 1 ? (
                      isSpecieLoading ? (
                        specie.map((aSpecie, index) => (
                          <ul className="" key={index}>
                            <li className={resultStyles.listItem}>
                              - {aSpecie.name}
                            </li>
                          </ul>
                        ))
                      ) : (
                        "Loading..."
                      )
                    ) : (
                      <h4 className={resultStyles.listItem}>
                        No specie available
                      </h4>
                    )}
                  </div>
                  <div className={resultStyles.list}>
                    <h3>Starships</h3>
                    {starship.length >= 1 ? (
                      isStarshipLoading ? (
                        starship.map((aStarship, index) => (
                          <ul className="" key={index}>
                            <li className={resultStyles.listItem}>
                              - {aStarship.name}
                            </li>
                          </ul>
                        ))
                      ) : (
                        "Loading..."
                      )
                    ) : (
                      <h4 className={resultStyles.listItem}>
                        No starship available
                      </h4>
                    )}
                  </div>
                  <div className={resultStyles.list}>
                    <h3>Vehicles</h3>
                    {vehicle.length >= 1 ? (
                      isVehicleLoading ? (
                        vehicle.map((aVehicle, index) => (
                          <ul className="" key={index}>
                            <li className={resultStyles.listItem}>
                              - {aVehicle.name}
                            </li>
                          </ul>
                        ))
                      ) : (
                        "Loading..."
                      )
                    ) : (
                      <h4 className={resultStyles.listItem}>
                        No vehicle available
                      </h4>
                    )}
                  </div>
                </div>
              </div>
            ))
          : "Loading"}
      </div>
    </div>
  );
};

export default Result;
