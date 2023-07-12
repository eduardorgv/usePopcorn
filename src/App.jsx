import { Main, Navbar, ListBox, WatchedBox } from "./components";
import { tempMovieData } from "./data/initialData";
import { useState } from "react";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <Navbar movies={movies} />
      <Main>
        <ListBox movies={movies} />
        <WatchedBox />
      </Main>
    </>
  );
}
