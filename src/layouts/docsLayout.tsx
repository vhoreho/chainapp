import { FC, ReactNode } from "react";
import { Footer } from "@/components/common/Footer/Footer";
import { Header } from "@/components/common/Header/Header";

type Props = {
  children: ReactNode;
};

export const DocsLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="layout relative grid grow grid-cols-[320px_1fr]">
        <main className="relative flex shrink-0 grow flex-col text-davy-500 ">{children}</main>
      </div>
      <Footer />
    </>
  );
};
