import Head from "next/head";
import { Auth } from "@/components/pages";

export default function Home() {
  return (
    <>
      <Head>
        <title>OSINT Insight Hub</title>
        <meta name="description" content="OSInt tools page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Auth />
      </main>
    </>
  );
}
