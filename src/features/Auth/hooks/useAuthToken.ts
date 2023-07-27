import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAuthToken = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();
  const getAuthToken = () => {
    setAuthToken(getCookie("authToken") as string | null);
  };
  useEffect(() => {
    document.addEventListener("CookieChanged", getAuthToken);
    return () => {
      document.removeEventListener("CookieChanged", getAuthToken);
    };
  }, []);

  useEffect(getAuthToken, [router.pathname]);
  return authToken;
};

export default useAuthToken;
