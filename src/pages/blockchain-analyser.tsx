import React from "react";
import { BlockchainAnalyser } from "@/components/pages/blockchain-analyser/BlockchainAnalyser";
import { makeI18nStaticProps } from "@/utils/i18n";

export const getStaticProps = makeI18nStaticProps();

export default function BlockchainAnalyserPage() {
  return <BlockchainAnalyser />;
}
