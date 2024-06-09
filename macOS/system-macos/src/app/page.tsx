"use client";

import styles from "./window.module.css";
import MenuBar from "./components/MenuBar";
import "./globals.css";

export default function MainScreen() {
  return (
    <div className={`${styles.background} relative overflow-hidden`}>
      <MenuBar />
    </div>
  );
}
