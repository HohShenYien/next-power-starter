import { apiClient } from "@/features/Auth/AxiosProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/features/Auth/types";
import { RegisterType } from "@/features/Auth/modals/RegisterModal";
import { AuthType } from "@/features/Auth/modals/LoginModal";
import { modals } from "@mantine/modals";
import { useRouter } from "next/router";
import {
  authRedirectPath,
  loginAfterRegister,
  logoutRoute,
} from "@/configs/auth.config";

const queryKeys = {
  me: ["me"],
};

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: AuthType) => {
      await apiClient.post("/auth/login", JSON.stringify(data), {
        headers: {
          "Content-Type": "text/plain",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
      setTimeout(() => {
        modals.closeAll();
        router.push(authRedirectPath);
      }, 500);
    },
  });
  return mutation;
};

export const useRegisterMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: RegisterType) => {
      await apiClient.post("/auth/register", data);
      return true;
    },
    onSuccess: () => {
      if (loginAfterRegister) {
        queryClient.invalidateQueries({ queryKey: queryKeys.me });
        setTimeout(() => {
          modals.closeAll();
          router.push(authRedirectPath);
        }, 500);
      }
    },
  });
  return mutation;
};

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await apiClient.get("/auth/logout");
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
      setTimeout(() => {
        modals.closeAll();
        router.push(logoutRoute);
      }, 500);
    },
  });
  return mutation;
};

export const useUserQuery = () => {
  const query = useQuery({
    queryKey: queryKeys.me,
    queryFn: async () => {
      try {
        const data = await apiClient.get("/auth/me");
        return data.data as User;
      } catch (exception) {
        return null;
      }
    },
    retry: false,
  });
  return query;
};
