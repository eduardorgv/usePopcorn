import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export const Navbar = ({ movies, query, setQuery }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <NumResults movies={movies} />
    </nav>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      {/* <span role="img">🍿</span> */}
      <img src="/icon.png" alt="UsePopcorn logo" height={40} width={40} />
      <h1>UsePopcorn</h1>
    </div>
  );
};

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useKey('Enter', function () {
    if(document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery("");
  })

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

const NumResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};
