import { FunctionComponent } from "react";
import { v4 } from "uuid";
import { useGetBlockchainQuery } from "@/api/blockchain";
import { ProfileResM } from "@/api/profile/type";
import { Spinner } from "@/components/common";
import { DEFAULT_WALLET_ADDRESS, ZERO_BLOCK } from "@/constants/vars";
import { Card } from "../card/Card";

type Props = {
  profile: ProfileResM;
};

export const CardsContainer: FunctionComponent<Props> = ({ profile }) => {
  const { data, isLoading } = useGetBlockchainQuery();

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
      <Card chain={ZERO_BLOCK} wallet={"Адрес отправителя"} isZeroBlock />
      {data.map((block) => (
        <div key={v4()}>
          <Card chain={block} wallet={profile.walletAddress} />
        </div>
      ))}
    </div>
  );
};
