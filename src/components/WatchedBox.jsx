import { Box } from "./Box";
import { MovieDetails } from "./MovieDetails";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const WatchedBox = ({ selectedId, onCloseMovie }) => {
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleAddWatched = (movie) => {
    setWatched([...watched, movie])
  }
  
  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  return (
    <Box>
      {selectedId ? (
        <MovieDetails 
          watched={watched}
          selectedId={selectedId} 
          onCloseMovie={onCloseMovie} 
          onAddWatched={handleAddWatched}
        />
      ) : (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList 
            watched={watched}
            onDeleteWatched={handleDeleteWatched}
          />
        </>
      )}
    </Box>
  );
};

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
};

const WatchedMoviesList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie 
        key={movie.imdbID} 
        movie={movie} 
        onDeleteWatched={onDeleteWatched}
      />
    ))}
  </ul>
  )
}

const WatchedMovie = ({ movie, onDeleteWatched }) => {
  return (
    <li>
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>

      <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
    </div>
  </li>
  )
}
