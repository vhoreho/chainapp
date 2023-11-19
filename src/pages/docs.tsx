import React from "react";
import { WhatIsBlockchain } from "@/components/pages/docs/sub/whatIsBlockchain";
import { makeI18nStaticProps } from "@/utils/i18n";

export const getStaticProps = makeI18nStaticProps();

export default function docs() {
  return <WhatIsBlockchain />;
}
