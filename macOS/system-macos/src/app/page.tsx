'use client';
import styles from "./window.module.css";
import "./globals.css";
import WeatherWidget from "./components/WeatherWidget";
import MenuBar from "./components/MenuBar";
import DockPanel from "./components/DockPanel";
import { useState } from "react";
import Launchpad from "./components/Launchpad";
import ClickerGame from "./components/ClickerGame";
import Calculator from "./components/Calculator";

interface OpenApp {
  appName: string;
  id: number;
}

const appComponents: { [key: string]: React.FC<{ onClose: () => void; id: number }> } = {
  ClickerGame,
  Calculator
  // Add other apps here
};

export default function MainScreen() {
  const [launchpadOpen, setLaunchpadOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState("Finder");
  const [openApps, setOpenApps] = useState<OpenApp[]>([]);

  const handleLaunchpadClick = () => {
    setLaunchpadOpen(!launchpadOpen);
  };

  const handleAppOpen = (appName: string) => {
      if (openApps.some(app => app.appName === appName)) 
        return;
    setCurrentApp(appName);
    const newApp: OpenApp = { appName, id: Date.now() };
    setOpenApps([...openApps, newApp]);
    setLaunchpadOpen(false);
  };

  const handleCloseApp = (id: number) => {
    setOpenApps(openApps.filter(app => app.id !== id));
  };

  return (

     <div className={`${styles.background} relative overflow-hidden`}>
      <MenuBar appName={currentApp} />
      <WeatherWidget />
      {launchpadOpen && (
        <Launchpad onAppOpen={handleAppOpen} />
      )}
      <DockPanel onLaunchpadClick={handleLaunchpadClick} onAppOpen={handleAppOpen} />
      {openApps.map(app => {
        const AppComponent = appComponents[app.appName];
        return AppComponent ? (
          <AppComponent key={app.id} onClose={() => handleCloseApp(app.id)} id={app.id} />
        ) : null;
      })}
    </div>
  );
}
