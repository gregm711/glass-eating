import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { SendOneLamportToRandomAddress } from "./components/SendOneLamportToRandomAddress";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Connect a wallet</h1>

        <div className={styles.walletButtons}>
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>

        <div className={styles.grid}>
          <Link href="/dao">
            <a className={styles.card}>Start a dao</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
