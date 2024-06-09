"use client";
import styles from "./window.module.css";
import Image from "next/image";
import "./globals.css";
import MenuBar from "./components/MenuBar";
import DockPanel from "./components/DockPanel";
import { useState } from "react";
import Launchpad from "./components/Launchpad";
import AppWindow from "./components/ClickerGame";

export default function MainScreen() {
  const [launchpadOpen, setLaunchpadOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState("Finder");
  const [openApp, setOpenApp] = useState<string | null>(null);

  const handleLaunchpadClick = () => {
    setLaunchpadOpen(!launchpadOpen);
  };

  const handleAppOpen = (appName: string) => {
    setCurrentApp(appName);
    setOpenApp(appName); // Open the app window
    setLaunchpadOpen(false);
  };

  const handleCloseApp = () => {
    setOpenApp(null); // Close the app window
  };

  return (
    <div className={`${styles.background} relative overflow-hidden`}>
      <MenuBar appName={currentApp} />
      {launchpadOpen && <Launchpad onAppOpen={handleAppOpen} />}
      <DockPanel
        onLaunchpadClick={handleLaunchpadClick}
        onAppOpen={handleAppOpen}
      />
      {openApp && <AppWindow appName={openApp} onClose={handleCloseApp} />}
    </div>
  );
}
