import { Main, Navbar, ListBox, WatchedBox } from "./components";
import { tempMovieData } from "./data/initialData";
import { useEffect, useState } from "react";

const KEY = 'a4d93804';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("interstellar");
  const [selectedId, setSelectedId] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async() => {
      try {
        setIsLoading(true);
        setError("");
  
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal })
        if(!res.ok) throw new Error('Something went wrong with fetching movies');
        
        const data = await res.json();
        if(data.Response === 'False') throw new Error(data.Error);

        setMovies(data.Search);
        setError("");
      } catch (error) {
        console.error(error.message);
        if(error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    if(query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    }
  }, [query])

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
