import React, { createContext } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // ✅ Persist theme in localStorage
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // Toggle function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // ✅ Apply Tailwind dark mode class to <html>
  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
