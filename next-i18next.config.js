/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en"],
    localeDetection: false,
  },
  localePath:
    typeof window === "undefined" ? require("path").resolve("./public/locales") : "/locales",
};