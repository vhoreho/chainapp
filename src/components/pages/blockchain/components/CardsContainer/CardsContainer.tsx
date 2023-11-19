import { memo } from "react";
import { v4 } from "uuid";
import { useGetBlockchainQuery } from "@/api/blockchain";
import { Spinner } from "@/components/common";
import { DEFAULT_WALLET_ADDRESS, ZERO_BLOCK } from "@/constants/vars";
import { Card } from "../Card/Card";

export const CardsContainer = memo(function CardsContainer() {
  const { data, isLoading } = useGetBlockchainQuery();
  console.log("🚀 ~ file: CardsContainer.tsx:11 ~ CardsContainer ~ data:", data);

  if (isLoading) {
    return (
      <div className="flex grow items-center justify-center">
        <Spinner size="lg" variant="blue" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-fit flex-col gap-4">
        <Card chain={ZERO_BLOCK} wallet={DEFAULT_WALLET_ADDRESS} isZeroBlock />
      </div>
    );
  }

  return (
    <div className="flex h-fit flex-col gap-4">
      <Card chain={ZERO_BLOCK} wallet={DEFAULT_WALLET_ADDRESS} isZeroBlock />
      {data.map((block) => (
        <div key={v4()}>
          <Card chain={block} wallet={DEFAULT_WALLET_ADDRESS} />
        </div>
      ))}
    </div>
  );
});
