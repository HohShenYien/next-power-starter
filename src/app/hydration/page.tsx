// Reference: https://codevoweb.com/setup-react-query-in-nextjs-13-app-directory/

import { dehydrate } from "@tanstack/query-core";
import ListUsers, { User } from "./list-users";
import getQueryClient from "@/utils/queries/getQueryClient";
import Hydrate from "@/utils/queries/hydrate.client";

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await res.json()) as User[];
  return users;
}

export default async function Hydation() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-users"], getUsers);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ListUsers />
    </Hydrate>
  );
}
