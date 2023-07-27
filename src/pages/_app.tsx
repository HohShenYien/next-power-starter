import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement } from "react";
import Provider from "@/components/utils/Provider";
import AuthGuard from "@/features/Auth/AuthGuard";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element;
} & {
  isPublic?: boolean;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        <AuthGuard Component={Component} pageProps={pageProps} />
      </Provider>
    </>
  );
}
