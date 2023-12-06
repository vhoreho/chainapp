import React from "react";
import { BlockchainReputation } from "@/components/pages/blockchain-reputation/BlockchainReputation";
import { makeI18nStaticProps } from "@/utils/i18n";

export const getStaticProps = makeI18nStaticProps();

export default function BlockchainReputationPage() {
  return <BlockchainReputation />;
}
