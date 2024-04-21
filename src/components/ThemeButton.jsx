import { useThemeContext } from "@/context/ThemeContext";
import React, { useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
const ThemeButton = () => {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={`border p-2 rounded-md ${
        !isDark
          ? " hover:bg-gray-200 border-gray-300"
          : " hover:bg-gray-500  border-white/35"
      }`}
      title="Theme Toggler "
    >
      {
        <div className="transition-all duration-300 ">
          {!isDark ? (
            <MdLightMode size={22} />
          ) : (
            <MdDarkMode color={!isDark ? "black" : "white"} size={22} />
          )}
        </div>
      }
    </button>
  );
};

export default ThemeButton;
