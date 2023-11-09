import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { BlockchainDropdown } from "./components/blockchain-dropdown/BlockchainDropdown";
import { ProfileDropdown } from "./components/profile-dropdown/ProfileDropdown";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-cornflower-500">
      <div className="layout flex items-center justify-between py-5">
        <Link href={ROUTES.HOME} className="font-semibold text-white hover:text-platinum-500">
          Blockchain Detective
        </Link>
        <nav className="ml-6 flex flex-wrap gap-2 md:gap-4">
          <Link href={ROUTES.HOME} className="text-white hover:text-platinum-500">
            Главная
          </Link>
          <BlockchainDropdown />
          <ProfileDropdown />
        </nav>
      </div>
    </header>
  );
};
