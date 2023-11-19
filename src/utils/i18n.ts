import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export function makeI18nStaticProps<TProps>(ns: string[] = ["common"], props?: TProps) {
  const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
    console.log("🚀 ~ file: i18n.ts:6 ~ getStaticProps ~ locale:", locale);
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", ns)),
        ...props,
      },
    };
  };

  return getStaticProps;
}
