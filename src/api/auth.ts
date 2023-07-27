import { apiClient } from "@/features/Auth/AxiosProvider";
import { deleteCookie } from "cookies-next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@/features/Auth/types";
import { AxiosError } from "axios";
import useAuthToken from "@/features/Auth/hooks/useAuthToken";
import { RegisterType } from "@/features/Auth/modals/RegisterModal";
import { AuthType } from "@/features/Auth/modals/LoginModal";
import { login } from "@/features/Auth/utils";
import { modals } from "@mantine/modals";
import { useRouter } from "next/router";
import { authRedirectPath, loginAfterRegister } from "@/configs/auth.config";

interface AuthResponse {
  auth_token: string;
}

export const useLoginMutation = () => {
  const router = useRouter();
  const query = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: AuthType) => {
      const res = await apiClient.post("/auth/login", JSON.stringify(data), {
        headers: {
          "Content-Type": "text/plain",
        },
      });
      return res.data as AuthResponse;
    },
    onSuccess: ({ auth_token }) => {
      login(auth_token);
      setTimeout(() => {
        modals.closeAll();
        router.push(authRedirectPath);
      }, 500);
    },
  });
  return query;
};

export const useRegisterMutation = () => {
  const router = useRouter();
  const query = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterType) => {
      const res = await apiClient.post("/auth/register", data);
      return res.data as AuthResponse;
    },
    onSuccess: ({ auth_token }) => {
      if (loginAfterRegister) {
        login(auth_token);
        setTimeout(() => {
          modals.closeAll();
          router.push(authRedirectPath);
        }, 500);
      }
    },
  });
  return query;
};

export const useUserQuery = () => {
  const authToken = useAuthToken();

  const query = useQuery({
    queryKey: ["me", authToken],
    queryFn: async () => {
      try {
        const data = await apiClient.get("/auth/me");
        return data.data as User;
      } catch (exception) {
        if (exception instanceof AxiosError) {
          if (exception.response?.status === 401) {
            deleteCookie("authToken", {
              path: "/",
              domain: process.env.NEXT_PUBLIC_DOMAIN,
            });
          }
        }
      }
    },
    enabled: !!authToken,
    retry: false,
  });
  return query;
};
