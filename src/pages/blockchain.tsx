import React from "react";
import { Blockchain } from "@/components/pages/blockchain/Blockchain";
import { makeI18nStaticProps } from "@/utils/i18n";

export const getStaticProps = makeI18nStaticProps();

export default function BlockchainPage() {
  return <Blockchain />;
}
