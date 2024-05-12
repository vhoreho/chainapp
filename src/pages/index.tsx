import { Auth } from "@/components/pages";

export async function getStaticProps() {
  const locale = "ru";

  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}

export default function Home() {
  return (
    <>
      <main>
        <Auth />
      </main>
    </>
  );
}
