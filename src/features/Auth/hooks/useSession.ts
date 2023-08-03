import { useMemo } from "react";
import { User } from "../types";
import { useUserQuery } from "../queries";

type Session =
  | {
      status: "loading" | "unauthenticated";
      user: undefined;
    }
  | {
      status: "authenticated";
      user: User;
    };

const useSession = () => {
  const { data, isError, isSuccess, isLoading } = useUserQuery();

  const session: Session = useMemo(() => {
    if (isSuccess && data) {
      return {
        status: "authenticated",
        user: data,
      };
    }
    if (isError) {
      return { status: "unauthenticated", user: undefined };
    }
    if (isLoading) {
      return { status: "loading", user: undefined };
    }
    return { status: "unauthenticated", user: undefined };
  }, [data, isError, isSuccess, isLoading]);

  return session;
};

export default useSession;
