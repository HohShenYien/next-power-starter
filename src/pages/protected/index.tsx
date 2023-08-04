import { NextPageWithAttributes } from "../_app";
import useSession from "@/features/Auth/hooks/useSession";

const ProtectedPage: NextPageWithAttributes = () => {
  const session = useSession();
  return (
    <div className="flex min-h-screen w-full flex-col items-stretch py-12">
      <h1>This is a protected page</h1>
      <div className="mt-2">
        The current user data (fetched from backend),
        <table className="mt-4">
          <tbody>
            <tr>
              <td className="pr-3 font-semibold">Email</td>
              <td>{session.user?.email}</td>
            </tr>
            <tr>
              <td className="pr-3 font-semibold">Username</td>
              <td>{session.user?.username}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

ProtectedPage.isPublic = false;
ProtectedPage.title = "A Protected Page";
export default ProtectedPage;
