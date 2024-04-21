import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setDark] = useState(false);
  const toggleTheme = () => setDark(!isDark);

  useEffect(() => {
    const bodyEl = document.body;

    const themeClass = !isDark ? "light-mode" : " dark-mode";
    bodyEl.className = themeClass;

    return () => {
      bodyEl.className = "";
    };
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
