import LanguageSwitcher from "@/components/ui/LanguageSwitcher/LanguageSwitcher";

export const Footer = () => (
  <footer className="sticky top-0 bg-cornflower-500 text-white">
    <div className="layout flex items-center justify-center py-5">{new Date().getFullYear()}</div>
    <LanguageSwitcher
      buttonClassnames="!text-platinum-500 uppercase"
      menuClassnames="!absolute !top-6 !right-6"
      itemsClassnames="w-fit !bottom-8 !origin-bottom-left !overflow-hidden"
      itemClassnames="cursor-pointer hover:bg-platinum-500 uppercase"
    />
  </footer>
);
