import { ProfileDropdown } from "./components/profile-dropdown/ProfileDropdown";
import { BlockchainDropdown } from "./components/blockchain-dropdown/BlockchainDropdown";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export const Header = () => {
  return (
    <header className="bg-cornflower-500 sticky top-0 z-50">
      <div className="layout py-5 flex justify-between items-center font-play">
        <Link
          href={ROUTES.HOME}
          className="font-montserrat font-semibold text-white hover:text-platinum-500"
        >
          Blockchain Detective
        </Link>
        <nav className="ml-6 flex gap-2 md:gap-4 flex-wrap">
          <Link
            href={ROUTES.HOME}
            className="text-white hover:text-platinum-500"
          >
            Главная
          </Link>
          <BlockchainDropdown />
          <ProfileDropdown />
        </nav>
      </div>
    </header>
  );
};
