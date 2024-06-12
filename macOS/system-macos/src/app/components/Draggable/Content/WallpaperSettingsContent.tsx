import { useWallpaperContext } from "@/app/contexts/WallpaperContext";
import { WALLPAPER_API_URL } from "@/app/constants";
import { FC, useEffect } from "react";

interface WallpaperSettingsContentProps {
  header?: string;
}
const WallpaperSettingsContent: FC<WallpaperSettingsContentProps> = ({
  header,
}) => {
  const { currentWallpaper, wallpapers, setWallpaper, setWallpapers } =
    useWallpaperContext();

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const response = await fetch(WALLPAPER_API_URL);
        const data = await response.json();

        setWallpapers(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    fetchWallpapers();
  }, []);

  return (
    <>
      <h3 className="px-4 pt-3 text-3 font-medium text-neutral-200">
        {header}
      </h3>
      <div className="flex gap-2 overflow-auto p-4">
        {wallpapers &&
          wallpapers.map((wallpaper) => {
            return (
              <img
                key={wallpaper.fullUrl}
                onClick={() => {
                  setWallpaper("screen-background-image", wallpaper);
                }}
                src={wallpaper.thumbUrl}
                className={`w-44 cursor-pointer rounded-md ${
                  wallpaper?.imageUrl === currentWallpaper?.imageUrl
                    ? "border-2 border-solid border-blue-500 p-1"
                    : ""
                }`}
                alt=""
              />
            );
          })}
      </div>
    </>
  );
};

export default WallpaperSettingsContent;
