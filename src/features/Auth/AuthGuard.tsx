import { NextPageWithLayout } from "@/pages/_app";
import getDefaultLayout from "@/layouts/BaseLayout";
import { useEffect, useState } from "react";
import useSession from "@/features/Auth/hooks/useSession";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import SplashScreen from "@/components/utils/SplashScreen";
import { notifications } from "@mantine/notifications";

interface AuthGuardProps {
  Component: NextPageWithLayout;
  pageProps: any;
}

const AuthGuard = ({ Component, pageProps }: AuthGuardProps) => {
  const session = useSession();
  const router = useRouter();

  const getLayout = Component.getLayout || getDefaultLayout;
  const isAuthenticated =
    session.status == "authenticated" || session.user != undefined;
  const canBrowse = Component.isPublic || isAuthenticated;

  useEffect(() => {
    if (!canBrowse && !getCookie("authToken") && session.status !== "loading") {
      notifications.show({
        message: "You are unauthenticated",
        color: "red",
      });
      router.push("/");
    }
  }, [canBrowse, router, session.status]);

  if (session.status === "loading" || !canBrowse) {
    return <SplashScreen />;
  }

  return <>{getLayout(<Component {...pageProps} />)}</>;
};

export default AuthGuard;
