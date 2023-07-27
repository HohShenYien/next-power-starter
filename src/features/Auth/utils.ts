import { notifications } from "@mantine/notifications";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";

export const login = (jwt: string, message?: string, expiryDate?: Date) => {
  if (!expiryDate) {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  }
  setCookie("authToken", jwt, { expires: expiryDate });
  notifications.show({
    message: message ?? "Login successfully, redirecting...",
    color: "green",
  });
};

export const useLogout = () => {
  const router = useRouter();
  const signout = () => {
    router.push("/");
    deleteCookie("authToken", {
      path: "/",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });
    cookieChanged();
    notifications.show({
      message: "Logged out successfully",
      color: "green",
    });
  };

  return signout;
};

export const cookieChanged = () => {
  const event = new Event("CookieChanged");
  document.dispatchEvent(event);
};
