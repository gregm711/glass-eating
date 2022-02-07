import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { SendOneLamportToRandomAddress } from "./components/SendOneLamportToRandomAddress";

const DAO: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Start a dao</h1>
        <div className={styles.grid}></div>
      </main>
    </div>
  );
};

export default DAO;
