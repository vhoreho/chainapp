import { v4 } from "uuid";
import { mineBlock } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Card } from "../Card/Card";

export const CardsContainer = () => {
  const chain = useAppSelector((state) => state.blockchain.chain);
  const walletAddress = useAppSelector((state) => state.blockchain.walletAddress);
  const dispatch = useAppDispatch();

  const handleMineBlock = (index: number) => {
    dispatch(mineBlock(index));
  };

  return (
    <div className="flex h-fit flex-col gap-4 transition-all delay-75">
      {chain.map((block, index) => (
        <div key={v4()}>
          <Card chain={block} wallet={walletAddress} onMine={() => handleMineBlock(index)} />
        </div>
      ))}
    </div>
  );
};
