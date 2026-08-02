import { useEffect } from "react";

const ThemeToggle = () => {
  useEffect(() => {
    document.documentElement.classList.remove("theme-light");
    localStorage.removeItem("theme");
  }, []);

  return null;
};

export default ThemeToggle;
