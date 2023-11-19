import React from "react";
import { Home } from "@/components/pages/home/Home";
import { makeI18nStaticProps } from "@/utils/i18n";

export const getStaticProps = makeI18nStaticProps();

export default function HomePage() {
  return <Home />;
}
