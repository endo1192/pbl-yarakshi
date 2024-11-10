import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from 'next/link';
import Image from 'next/image';



export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
        <main className={styles.main}>
          
        <br /><br /><br /><br /><br /><br />
        <p>情報リテラシー</p>
        <p>やらかし事例クイズ</p>
        <Link href="/StartWorld"><Image src="/images/start.png" alt="background" width={300}height={120} /></Link>
        {/*<p><Link href="/Bstart">beginerコース</Link></p>*/}
          

          
        </main>
        
    </>
          
  );
}
