import { useState, useEffect, useMemo, useCallback } from 'react';

export function useMediaQuery(query: string) {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);

  const [matches, setMatches] = useState(mediaQuery.matches);

  const handleChange = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [mediaQuery, handleChange]);

  return matches;
}
