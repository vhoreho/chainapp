import Link from "next/link";
import { SIDEBAR_LINKS } from "./constants";
import { randomUUID } from "crypto";

export const Sidebar = () => (
  <aside className="w-80 fixed top-16 h-[calc(100vh_-_128px)] py-7 px-5 font-play">
    <h2 className="font-semibold text-xl flex flex-col gap-3 text-davy-500">
      {SIDEBAR_LINKS.map((link) => (
        <Link key={randomUUID()} href={link.route}>
          {link.title}
        </Link>
      ))}
    </h2>
  </aside>
);
