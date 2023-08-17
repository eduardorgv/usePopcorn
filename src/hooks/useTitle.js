import { useEffect } from "react";

export function useTitle(title) {
  useEffect(() => {
    if (!title) return;
    document.title = `MOVIE ${title}`;

    return () => {
      document.title = "UsePopcorn";
    };
  }, [title]);
}
