import { FC, ReactNode } from "react";
import { Footer } from "@/components/common/Footer/Footer";
import { Header } from "@/components/common/Header/Header";

type Props = {
  children: ReactNode;
};

export const CommonLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="layout mx-auto flex w-full shrink-0 grow flex-col">{children}</main>
      <Footer />
    </>
  );
};
