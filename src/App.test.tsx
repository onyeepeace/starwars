import { render } from "@testing-library/react";
import App from "./App";
import axios, { AxiosResponse } from "axios";
import { ICharacters } from "./api/index";
jest.mock("axios");

describe("Search works", () => {
  test("renders input element", () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("searchBar");
    expect(input).toBeInTheDocument();
  });

  test("renders button element", () => {
    const { getByTestId } = render(<App />);
    const button = getByTestId("button");
    expect(button).toBeInTheDocument();
  });
});

const characters = (name: string) => {
  const url = `http://swapi.dev/api/people/?search=${name}`;
  const fetchResult = axios
    .get(url)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Something went wrong");
      }
      return res.data;
    })
    .catch((error) => error);
  return fetchResult;
};

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("API works", () => {
  test("should return person data", async () => {
    const person = {} as ICharacters;

    const mockedResponse: AxiosResponse = {
      data: person,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axios.get).not.toHaveBeenCalled();
    const data = await characters("Luke Skywalker");
    expect(axios.get).toHaveBeenCalled();
    expect(data).toEqual(person);
  });
});
