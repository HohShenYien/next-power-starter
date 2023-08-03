import { AxiosProvider } from "@/features/Auth/AxiosProvider";
import theme from "@/styles/MantineTheme";
import { modals } from "@/utils/modals/modals";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <AxiosProvider>
      <QueryClientProvider client={client}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <ModalsProvider modals={modals}>{children}</ModalsProvider>
          <Notifications />
        </MantineProvider>
      </QueryClientProvider>
    </AxiosProvider>
  );
};

export default Provider;
