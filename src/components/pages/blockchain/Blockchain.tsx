import { useGetSignedTransactionsQuery, useGetUnsignedTransactionsQuery } from "@/api/blockchain";
import { useGetProfileQuery } from "@/api/profile";
import { Spinner } from "@/components/common";
import { CommonLayout } from "@/layouts/commonLayout";
import { BlockchainHeader } from "./components/blockchain-header/BlockchainHeader";
import { CardsContainer } from "./components/cards-container/CardsContainer";

export const Blockchain = () => {
  const { data: profile, isLoading: isGetProfileLoading } = useGetProfileQuery();
  const { data: unsignedTransactions, isLoading: isGetUnsignedTransactionsLoading } =
    useGetUnsignedTransactionsQuery();
  const { data: signedTransactions, isLoading: isGetSignedTransactionsLoading } =
    useGetSignedTransactionsQuery();

  if (isGetProfileLoading && isGetUnsignedTransactionsLoading && isGetSignedTransactionsLoading) {
    return (
      <CommonLayout>
        <div className="flex grow flex-col py-7">
          <div className="layout flex w-full grow flex-col items-center justify-center">
            <Spinner variant="blue" size="lg" />
          </div>
        </div>
      </CommonLayout>
    );
  }

  if (!profile || !unsignedTransactions || !signedTransactions) {
    return null;
  }

  return (
    <CommonLayout>
      <div className="flex grow flex-col py-7">
        <div className="layout flex w-full grow flex-col">
          <BlockchainHeader
            profile={profile}
            unsignedTransactions={unsignedTransactions}
            signedTransactions={signedTransactions}
          />
          <CardsContainer profile={profile} />
        </div>
      </div>
    </CommonLayout>
  );
};
