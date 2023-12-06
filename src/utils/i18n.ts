import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export function makeI18nStaticProps<TProps>(ns: string[] = ["common"], props?: TProps) {
  const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "ru", ns)),
        ...props,
      },
    };
  };

  return getStaticProps;
}
