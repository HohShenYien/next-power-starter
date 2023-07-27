import { useUserQuery } from "@/api/auth";
import { useMemo } from "react";
import { User } from "../types";
import useAuthToken from "./useAuthToken";

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
  const { data, isError } = useUserQuery();
  const authToken = useAuthToken();

  const session: Session = useMemo(() => {
    console.log("AUTH TOKEN Changed");
    console.log(authToken);
    if (!authToken) {
      return { status: "unauthenticated", user: undefined };
    }
    if (data) {
      return { status: "authenticated", user: data };
    }
    if (isError) {
      return { status: "unauthenticated", user: undefined };
    }

    return { status: "loading", user: undefined };
  }, [data, isError, authToken]);

  return session;
};

export default useSession;
