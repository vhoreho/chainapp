import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header/Header";
import { Sidebar } from "@/components/common/Sidebar/Sidebar";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const DocsLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex relative grow">
        <Sidebar />
        <main className="relative grow shrink-0 flex flex-col ml-80 max-w-[calc(100%_-_320px)] text-davy-500 ">
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
};
