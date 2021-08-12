import { FC, ChangeEvent, useState } from "react";
import { characters, ICharacters } from "./api";
import Result from "./Result";
import mainStyles from "./App.module.css";
import starwarsLogo from "./images/starwars.png";

const App: FC = () => {
  const [person, setPerson] = useState<string>("");
  const [data, setData] = useState<[] | ICharacters[]>([]);

  const handleSearch = async (name: string) => {
    const result = await characters(name);
    setData(result);
    setPerson("");
  };
  return (
    <div className={mainStyles.container}>
      <header className={mainStyles.header}>
        <img
          className={mainStyles.logo}
          src={starwarsLogo}
          alt="starwars logo"
        />
        <h1 className={mainStyles.title}>
          Search for your favourite StarWars character
        </h1>
        <div className={mainStyles.search}>
          <input
            data-testid="searchBar"
            type="search"
            name="name"
            id="name"
            value={person}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPerson(e.target.value)
            }
          />
          <button data-testid="button" onClick={() => handleSearch(person)}>
            Search
          </button>
        </div>
      </header>
      <main className={mainStyles.main}>{<Result data={data} />}</main>
    </div>
  );
};

export default App;
