"use client";
import styles from "./window.module.css";
import "./globals.css";
import WeatherWidget from "./components/WeatherWidget";
import MenuBar from "./components/MenuBar";
import DockPanel from "./components/DockPanel";
import { useState } from "react";
import Launchpad from "./components/Launchpad";
import ClickerGame from "./components/ClickerGame";
import Calculator from "./components/Calculator";
import Draggable from "./components/Draggable/Draggable";
import ScreenContextMenu from "./components/ScreenContextMenu";
import { useWallpaperContext } from "./contexts/WallpaperContext";
import { itemGroups } from "@/mocks";
import WallpaperSettingsContent from "./components/Draggable/Content/WallpaperSettingsContent";
import Item from "./components/Draggable/Sidebar/Items/Item";
import ItemGroup from "./components/Draggable/Sidebar/Items/ItemGroup";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Game2048 from "./components/2048Game/2048Game";

interface OpenApp {
  appName: string;
  id: number;
}

const appComponents: {
  [key: string]: React.FC<{ onClose: () => void; id: number }>;
} = {
  ClickerGame,
  Calculator,
  Game2048,
  // Add other apps here
};

const contents = [
  {
    id: itemGroups[0].items[0].id,
  },
  {
    id: itemGroups[1].items[0].id,
    content: (
      <>
        <WallpaperSettingsContent header="Your Photos" />
        <WallpaperSettingsContent header="Landscapes" />
      </>
    ),
  },
];

export default function MainScreen() {
  const [launchpadOpen, setLaunchpadOpen] = useState(false);
  const [draggableOpen, setDraggableOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState("Finder");
  const [openApps, setOpenApps] = useState<OpenApp[]>([]);

  // draggable
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const { currentWallpaper } = useWallpaperContext();

  const handleLaunchpadClick = () => {
    setLaunchpadOpen(!launchpadOpen);
  };

  const handleAppOpen = (appName: string) => {
    if (openApps.some((app) => app.appName === appName)) return;
    setCurrentApp(appName);
    const newApp: OpenApp = { appName, id: Date.now() };
    setOpenApps([...openApps, newApp]);
    setLaunchpadOpen(false);
  };

  const handleCloseApp = (id: number) => {
    setOpenApps(openApps.filter((app) => app.id !== id));
  };

  const closeDraggable = () => {
    setDraggableOpen(false);
  };

  const sidebarContent = (
    <>
      {itemGroups.map((group) => {
        const items = group.items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            iconSrc={item.iconSrc}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            title={item.title}
          />
        ));
        return <ItemGroup key={group.header}>{items}</ItemGroup>;
      })}
    </>
  );

  const headerContent =
    selectedItem?.id === itemGroups[1].items[0].id ? (
      <div className="flex flex-col">
        <div className="flex items-center gap-2 p-4">
          <IoIosArrowBack size={22} className="text-neutral-500" />
          <IoIosArrowForward size={22} className="text-neutral-500" />
          <h3>{selectedItem?.title}</h3>
        </div>
        <div className="overflow-auto max-h-[calc(100vh-200px);] py-2 border-b border-solid border-neutral-500/50">
          <div className="flex gap-2 px-4">
            <div className="flex items-center justify-center w-44 border-[3px] p-0.5 border-solid border-neutral-500 rounded-xl">
              <img
                src={currentWallpaper?.imageUrl}
                className="w-full h-full rounded-lg"
                alt="Background image"
              />
            </div>

            <div>
              <div className="box-border border border-solid border-neutral-400 rounded-md px-3 py-2 text-3">
                {currentWallpaper?.title ?? "Current Wallpaper"}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col">
        <div className="flex items-center gap-2 p-4">
          <IoIosArrowBack size={22} className="text-neutral-500" />
          <IoIosArrowForward size={22} className="text-neutral-500" />
          <h3>{selectedItem?.title}</h3>
        </div>
      </div>
    );

  return (
    <div className={`${styles.background} relative overflow-hidden`}>
      <img
        id="screen-background-image"
        src={currentWallpaper?.imageUrl}
        alt="Background image"
        className="object-cover absolute inset-0 w-full"
      />
      <MenuBar appName={currentApp} />
      <WeatherWidget />
      <ScreenContextMenu setDraggableOpen={setDraggableOpen} />
      <Draggable
        sidebarContent={sidebarContent}
        headerContent={headerContent}
        enableHeaderSeparator={true}
        enableSidebarSeparator={true}
        opened={draggableOpen}
        close={closeDraggable}
      >
        {contents.find((content) => content.id === selectedItem?.id)?.content}
      </Draggable>
      {launchpadOpen && <Launchpad onAppOpen={handleAppOpen} />}
      <DockPanel
        onLaunchpadClick={handleLaunchpadClick}
        onAppOpen={handleAppOpen}
      />
      {openApps.map((app) => {
        const AppComponent = appComponents[app.appName];
        return AppComponent ? (
          <AppComponent
            key={app.id}
            onClose={() => handleCloseApp(app.id)}
            id={app.id}
          />
        ) : null;
      })}
    </div>
  );
}
