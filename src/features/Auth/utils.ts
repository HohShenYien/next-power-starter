import { notifications } from "@mantine/notifications";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

export const login = (jwt: string, message?: string, expiryDate?: Date) => {
  if (!expiryDate) {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  }
  setCookie("authToken", jwt, { expires: expiryDate });
  cookieChanged();
  notifications.show({
    message: message ?? "Login successfully, redirecting...",
    color: "green",
  });
};

export const useLogout = () => {
  const router = useRouter();
  const signout = () => {
    router.push("/");
    // Logging out after redirected
    setTimeout(() => {
      deleteCookie();
      notifications.show({
        message: "Logged out successfully",
        color: "green",
      });
    }, 300);
  };

  return signout;
};

export const deleteCookie = () => {
  // Deleting cookie by setting it to a long ago time
  const expired = new Date();
  expired.setFullYear(1970);
  setCookie("authToken", "", { expires: expired });
  cookieChanged();
};

export const cookieChanged = () => {
  const event = new Event("CookieChanged");
  document.dispatchEvent(event);
};
