import { Ubuntu } from "next/font/google";
import Head from "next/head";

// import { Auth } from "@/components/pages";
import { AppView } from "@/sections/overview/view";

const ubuntu = Ubuntu({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "500", "400", "700"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>OSInt Tools page</title>
        <meta name="description" content="OSInt tools page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${ubuntu.className}`}>
        <AppView />
      </main>
    </>
  );
}
