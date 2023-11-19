import { Auth } from "@/components/pages/auth/Auth";
import { makeI18nStaticProps } from "@/utils/i18n";

export const getStaticProps = makeI18nStaticProps();

export default function Home() {
  return <Auth />;
}
