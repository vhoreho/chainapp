import React from "react";
import { BlockchainExplorer } from "@/components/pages/blockchain-explorer/BlockchainExplorer";
import { makeI18nStaticProps } from "@/utils/i18n";

export const getStaticProps = makeI18nStaticProps();

export default function BlockchainExplorerPage() {
  return <BlockchainExplorer />;
}
