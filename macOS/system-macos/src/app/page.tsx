import styles from "./window.module.css";
import Image from 'next/image';
import "./globals.css";
import MenuBar from "./components/MenuBar"
export default function MainScreen() {
 

  return (
    <div className={styles.background}>
       <MenuBar />
  </div>
  );
}
