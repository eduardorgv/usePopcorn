import { useState } from "react";
import { tempWatchedData } from "../data/initialData";
import { Box } from "./Box";
import { MovieDetails } from "./MovieDetails";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const WatchedBox = ({ selectedId, onCloseMovie }) => {
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <Box>
      {selectedId ? (
        <MovieDetails selectedId={selectedId} onCloseMovie={onCloseMovie} />
      ) : (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
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
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const WatchedMoviesList = ({ watched }) => {
  return (
    <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie key={movie.imdbID} movie={movie} />
    ))}
  </ul>
  )
}

const WatchedMovie = ({ movie }) => {
  return (
    <li>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
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
    </div>
  </li>
  )
}
