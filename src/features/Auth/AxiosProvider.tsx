import { notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const queryClient = new QueryClient();

const AxiosProvider = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response;
    };

    const errInterceptor = (error: any) => {
      if (error?.response?.status === 401 && error?.response?.data?.message) {
        notifications.show({
          message: error.response.data.message,
          color: "red",
        });
        router.push("/");
      } else if (error?.response?.status === 400) {
        if (error?.response?.data?.message) {
          notifications.show({
            message: error?.response?.data?.message,
            color: "red",
          });
        }
      }

      return Promise.reject(error);
    };

    const reqInterceptor = apiClient.interceptors.request.use((config) => {
      // TODO: Might want to add in CSRF?
      return config;
    });

    const interceptor = apiClient.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => {
      apiClient.interceptors.response.eject(interceptor);
      apiClient.interceptors.request.eject(reqInterceptor);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { AxiosProvider, apiClient };
