import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header/Header";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const CommonLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="grow shrink-0 flex flex-col max-w-[1240px] mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
};
