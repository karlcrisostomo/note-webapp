import React, { useEffect, useState } from "react";
import { LoadingSkeleton } from ".";
import { useThemeContext } from "@/context/ThemeContext";

const Layout = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const {isDark} = useThemeContext()
  useEffect(() => {
    const delay = 2000; // Set the delay in milliseconds

    const delayPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });

    delayPromise.then(() => {
      setLoading(false);
    });

    return () => clearTimeout(delayPromise);
  }, []);

  return (
    <section className={`container mx-auto p-4      `}>
      {isLoading && <LoadingSkeleton />}
      <div className=" w-[500px]  h-[500px]   fixed  z-0 top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%]    blur-[200px]  bg-orange-400/45   rounded-[100%]"/>
      {!isLoading && children}
    </section>
  );
};

export default Layout;
