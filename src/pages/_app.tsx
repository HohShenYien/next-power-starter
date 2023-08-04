import "@/styles/globals.scss";
import "@/styles/preflight.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement } from "react";
import Provider from "@/components/utils/Provider";
import AuthGuard from "@/features/Auth/AuthGuard";
import Meta from "@/components/utils/Meta";

export type NextPageWithAttributes<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element;
  isPublic?: boolean;
  title?: string;
};

type AppPropsWithAttributes = AppProps & {
  Component: NextPageWithAttributes;
};

export default function App({ Component, pageProps }: AppPropsWithAttributes) {
  return (
    <>
      <Meta
        title={Component.title}
        description="A powerful zap starter template with simplicity and flexibility in mind"
        image="https://user-images.githubusercontent.com/55322546/256514847-e21721f5-bb92-49e0-9d2d-23dc7f98f30d.png"
      />
      <Provider>
        <AuthGuard Component={Component} pageProps={pageProps} />
      </Provider>
    </>
  );
}
