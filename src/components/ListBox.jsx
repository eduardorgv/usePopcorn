import { Box } from "./Box";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";

export const ListBox = ({ movies, isLoading, error, onSelectMovie }) => {
  return (
    <Box>
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <MovieList movies={movies} onSelectMovie={onSelectMovie} />
      )}
      {error && <ErrorMessage message={error} />}
    </Box>
  );
};

const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};

const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};
