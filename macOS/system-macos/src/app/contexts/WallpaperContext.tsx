"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

interface Wallpaper {
  title: string;
  copyright?: string;
  fullUrl?: string;
  thumbUrl?: string;
  imageUrl: string;
  date?: string;
  pageUrl?: string;
}

interface WallpaperContext {
  wallpapers: Wallpaper[] | undefined;
  currentWallpaper: Wallpaper | undefined;
  setWallpaper: (backgroundImageId: string, wallpaper: Wallpaper) => void;
  setWallpapers: React.Dispatch<React.SetStateAction<Wallpaper[] | undefined>>;
  getCurrentWallpaper: (backgroundImageId: string) => Wallpaper | undefined;
}

export const WallpaperContext = createContext({} as WallpaperContext);

export default function WallpaperContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [wallpapers, setWallpapers] = useState<Wallpaper[] | undefined>();
  const [currentWallpaper, setCurrentWallpaper] = useState<
    Wallpaper | undefined
  >({ imageUrl: "/image/Color Mode=Light.png" } as Wallpaper);

  const setWallpaper = (backgroundImageId: string, wallpaper: Wallpaper) => {
    const backgroundImage = document.getElementById(backgroundImageId);
    if (!backgroundImage) {
      return;
    }

    setCurrentWallpaper(wallpaper);
  };

  const getCurrentWallpaper = (backgroundImageId: string) => {
    const backgroundImage = document.getElementById(backgroundImageId);
    if (!backgroundImage) {
      return;
    }

    return currentWallpaper;
  };

  return (
    <WallpaperContext.Provider
      value={{
        wallpapers,
        currentWallpaper,
        setWallpaper,
        setWallpapers,
        getCurrentWallpaper,
      }}
    >
      {children}
    </WallpaperContext.Provider>
  );
}

export const useWallpaperContext = () => {
  const context = useContext(WallpaperContext);
  if (!context) {
    throw new Error(
      "useWallpaperContext must be used within WallpaperContextProvider"
    );
  }

  return context;
};
