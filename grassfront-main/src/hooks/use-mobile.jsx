import { useEffect, useState } from "react";

export function useIsMobile(initialState = false) {
  const [isMobile, setIsMobile] = useState(initialState);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = () => {
      setIsMobile(!!mql.matches);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
