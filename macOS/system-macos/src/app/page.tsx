'use client'
import styles from "./window.module.css";
import Image from 'next/image';
import "./globals.css";
import MenuBar from "./components/MenuBar"
import DockPanel from "./components/DockPanel";
import { useState } from "react";
import Launchpad from "./components/Launchpad";

export default function MainScreen() {
  const [launchpadOpen, setLaunchpadOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState("Finder");

  const handleLaunchpadClick = () => {
    setLaunchpadOpen(!launchpadOpen);
  };

  const handleAppOpen = (appName: string) => {
    setCurrentApp(appName);
    setLaunchpadOpen(false);
  };

  return (
    <div className={styles.background}>
      <MenuBar appName={currentApp} />
      {launchpadOpen && (
        <Launchpad onAppOpen={handleAppOpen} />
      )}
      <DockPanel onLaunchpadClick={handleLaunchpadClick} onAppOpen={handleAppOpen} />
    </div>
  );
}
