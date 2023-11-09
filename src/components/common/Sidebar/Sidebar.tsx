import Link from "next/link";
import { v4 } from "uuid";
import { SIDEBAR_LINKS } from "./constants";

export const Sidebar = () => (
  <aside className="px-5 py-7">
    <h2 className="flex flex-row gap-3 text-xl font-semibold text-davy-500">
      {SIDEBAR_LINKS.map((link) => (
        <Link key={v4()} href={link.route}>
          {link.title}
        </Link>
      ))}
    </h2>
  </aside>
);
