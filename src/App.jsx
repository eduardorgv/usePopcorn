import { Main, Navbar, ListBox, WatchedBox } from "./components";
import { useState } from "react";
import { useMovies } from "./hooks/useMovies";

export default function App() {

  const [query, setQuery] = useState("interstellar");
  const [selectedId, setSelectedId] = useState(null);
  
  const { movies, isLoading, error } = useMovies(query);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  const handleCloseMovie = () => {
    setSelectedId(null);
  }

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <ListBox 
          movies={movies} 
          isLoading={isLoading} 
          error={error} 
          onSelectMovie={handleSelectMovie}
        />
        <WatchedBox selectedId={selectedId} onCloseMovie={handleCloseMovie} />
      </Main>
    </>
  );
}
